import dayjs from "dayjs";

const initialState = {
  token: null,
  user: {
    daily_nutrition_target: null,
    height: null,
    weight: null,
    gender: null,
    goal: null,
    activity_level: null,
    birthdate: null,
    nutrition_stats: [],
    meal_logs: [],
  },
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
      return {
        ...state,
        token: action.payload.token,
        user: action.payload.user,
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
      const todayDate = dayjs(todayStats.date).startOf("day").toISOString();

      // Update nutrition_stats
      const updatedNutritionStats = state.user.nutrition_stats.filter((stat) => dayjs(stat.date).startOf("day").toISOString() !== todayDate);

      updatedNutritionStats.push(todayStats);

      // Update meal_logs
      const existingMealLogIndex = state.user.meal_logs.findIndex((log) => dayjs(log.date).startOf("day").toISOString() === todayDate);

      let updatedMealLogs = [...state.user.meal_logs];

      if (existingMealLogIndex !== -1) {
        // Jika sudah ada log hari ini, tambahkan ke array meals
        updatedMealLogs[existingMealLogIndex] = {
          ...updatedMealLogs[existingMealLogIndex],
          meals: [...updatedMealLogs[existingMealLogIndex].meals, ...todayMeals],
        };
      } else {
        // Jika belum ada, tambahkan log baru
        updatedMealLogs.push({
          date: todayStats.date,
          meals: [...todayMeals],
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
