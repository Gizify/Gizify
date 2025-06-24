import dayjs from "dayjs";

const initialState = {
  token: null,
  user: {
    name: null,
    email: null,
    birthDate: null,
    gestational_age: null,
    height: null,
    weight: null,
    activity_level: null,
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
  },
  expiredAt: null,
  loading: false,
  error: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "REGISTER_REQUEST":
    case "LOGIN_REQUEST":
    case "PROFILE_UPDATE_REQUEST":
    case "ADD_CONSUMPTION_REQUEST":
      return {
        ...state,
        loading: true,
        error: null,
      };

    case "REGISTER_SUCCESS":
    case "LOGIN_SUCCESS":
      const expiredAt = Date.now() + 6 * 24 * 60 * 60 * 1000;
      return {
        ...state,
        token: action.payload.token,
        user: action.payload.user,
        expiredAt: expiredAt,
        loading: false,
        error: null,
      };

    case "PROFILE_UPDATE_SUCCESS":
      return {
        ...state,
        user: action.payload.mergedUser,
        loading: false,
        error: null,
      };

    case "ADD_CONSUMPTION_SUCCESS": {
      const { todayStats, todayMeals } = action.payload;

      // Always use current date if date is null/invalid
      const todayDate = dayjs().startOf("day").format("YYYY-MM-DD");
      const statsDate = dayjs(todayStats?.date).isValid() ? dayjs(todayStats.date).startOf("day").format("YYYY-MM-DD") : todayDate;

      // Update nutrition stats
      const updatedNutritionStats = state.user.nutrition_stats.filter((stat) => dayjs(stat.date).format("YYYY-MM-DD") !== todayDate);

      updatedNutritionStats.push({
        ...todayStats,
        date: statsDate, // Ensure date is properly set
      });

      // Update meal logs
      let updatedMealLogs = [...state.user.meal_logs];
      const existingLogIndex = updatedMealLogs.findIndex((log) => dayjs(log.date).format("YYYY-MM-DD") === todayDate);

      if (existingLogIndex !== -1) {
        updatedMealLogs[existingLogIndex] = {
          date: todayDate,
          meals: todayMeals,
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
    case "DELETE_ACCOUNT_SUCCESS":
      return {
        ...state,
        loading: false,
        user: null,
        token: null,
        expiredAt: null,
        error: null,
      };

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

    case "LOGOUT":
      return initialState;

    default:
      return state;
  }
};

export default authReducer;
