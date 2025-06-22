import dayjs from "dayjs";

// Nilai awal user state
const initialUserState = {
  name: null,
  email: null,
  birthdate: null, // fix from birthDate
  gestational_age: { months: 0, days: 0 }, // default structured
  height: null,
  weight: null,
  activity: null, // fix from activity_level
  medical_history: [], // default as array
  daily_nutrition_target: {
    calories: 0,
    protein: 0,
    carbs: 0,
    fat: 0,
    fiber: 0,
    sugar: 0,
    sodium: 0,
    folic_acid: 0,
    kalsium: 0,
    vitamin_d: 0,
    vitamin_b12: 0,
    vitamin_c: 0,
    zinc: 0,
    iodium: 0,
    water: 0,
    iron: 0,
  },
  nutrition_stats: [],
  meal_logs: [],
  favorites: [],
  photoOption: null,
};

// State awal reducer
const initialState = {
  token: null,
  user: { ...initialUserState },
  expiredAt: null,
  loading: false,
  error: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    // Request actions
    case "REGISTER_REQUEST":
    case "LOGIN_REQUEST":
    case "PROFILE_UPDATE_REQUEST":
    case "ADD_CONSUMPTION_REQUEST":
      return {
        ...state,
        loading: true,
        error: null,
      };

    // Auth success (login & register)
    case "REGISTER_SUCCESS":
    case "LOGIN_SUCCESS":
      const expiredAt = Date.now() + 6 * 24 * 60 * 60 * 1000; // 6 hari
      return {
        ...state,
        token: action.payload.token,
        user: action.payload.user,
        expiredAt,
        loading: false,
        error: null,
      };

    // Profile update success
    case "PROFILE_UPDATE_SUCCESS":
      return {
        ...state,
        user: action.payload.mergedUser || action.payload.user,
        loading: false,
        error: null,
      };

    // Tambah konsumsi makanan
    case "ADD_CONSUMPTION_SUCCESS": {
      const { todayStats, todayMeals } = action.payload;

      const todayDate = dayjs().startOf("day").format("YYYY-MM-DD");
      const statsDate = dayjs(todayStats?.date).isValid()
        ? dayjs(todayStats.date).startOf("day").format("YYYY-MM-DD")
        : todayDate;

      // Filter stats agar tidak duplikat di hari yang sama
      const updatedNutritionStats = state.user.nutrition_stats.filter(
        (stat) => dayjs(stat.date).format("YYYY-MM-DD") !== todayDate
      );

      updatedNutritionStats.push({
        ...todayStats,
        date: statsDate,
      });

      // Update meal logs
      let updatedMealLogs = [...state.user.meal_logs];
      const existingLogIndex = updatedMealLogs.findIndex(
        (log) => dayjs(log.date).format("YYYY-MM-DD") === todayDate
      );

      if (existingLogIndex !== -1) {
        updatedMealLogs[existingLogIndex] = {
          date: todayDate,
          meals: [...updatedMealLogs[existingLogIndex].meals, ...todayMeals],
        };
      } else {
        updatedMealLogs.push({
          date: todayDate,
          meals: todayMeals,
        });
      }

      return {
        ...state,
        loading: false,
        user: {
          ...state.user,
          nutrition_stats: updatedNutritionStats,
          meal_logs: updatedMealLogs,
        },
      };
    }

    // Akun berhasil dihapus
    case "DELETE_ACCOUNT_SUCCESS":
      return {
        ...state,
        loading: false,
        user: { ...initialUserState }, // reset user state
        token: null,
        expiredAt: null,
        error: null,
      };

    // Semua jenis failure
    case "DELETE_ACCOUNT_FAILURE":
    case "REGISTER_FAILURE":
    case "LOGIN_FAILURE":
    case "PROFILE_UPDATE_FAILURE":
    case "ADD_CONSUMPTION_FAILURE":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    // Logout
    case "LOGOUT":
      return {
        ...initialState,
      };

    default:
      return state;
  }
};

export default authReducer;