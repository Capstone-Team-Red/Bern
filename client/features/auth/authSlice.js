import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

/*
  CONSTANT VARIABLES
*/
const TOKEN = "token";

/*
  THUNKS
*/
export const me = createAsyncThunk("auth/me", async () => {
  const token = window.localStorage.getItem(TOKEN);
  try {
    if (token) {
      const res = await axios.get("/auth/me", {
        headers: {
          authorization: token,
        },
      });
      return res.data;
    } else {
      return {};
    }
  } catch (err) {
    if (err.response.data) {
      return thunkAPI.rejectWithValue(err.response.data);
    } else {
      return "There was an issue with your request.";
    }
  }
});

export const authenticateLogin = createAsyncThunk(
  'auth/authenticateLogin',
  async ({ username, password, role, method }, thunkAPI) => {
    try {
      const res = await axios.post(`/auth/${method}`, { username, password, role });
      window.localStorage.setItem(TOKEN, res.data.token);
      thunkAPI.dispatch(me(role));
    } catch (err) {
      if (err.response.data) {
        return thunkAPI.rejectWithValue(err.response.data);
      } else {
        return 'There was an issue with your request.';
      }
    }
  }
);

export const authenticateSignUp = createAsyncThunk(
  'auth/authenticateSignUp',
  async ({ username, password, firstname, lastname, email, role, zipcode, method }, thunkAPI) => {
    try {
      const res = await axios.post(`/auth/${method}`, { username, password, firstname, lastname, email, role, zipcode });
      window.localStorage.setItem(TOKEN, res.data.token);
      thunkAPI.dispatch(me(role));
    } catch (err) {
      if (err.response.data) {
        return thunkAPI.rejectWithValue(err.response.data);
      } else {
        return 'There was an issue with your request.';
      }
    }
  }
);

export const authenticateRenterLogin = createAsyncThunk(
  'auth/authenticateRenterLogin',
  async ({ username, password, role, method }, thunkAPI) => {
    try {
      const res = await axios.post(`/auth/${method}`, { username, password, role });
      window.localStorage.setItem(TOKEN, res.data.token);
      thunkAPI.dispatch(me(role));
    } catch (err) {
      if (err.response.data) {
        return thunkAPI.rejectWithValue(err.response.data);
      } else {
        return 'There was an issue with your request.';
      }
    }
  }
);

export const authenticateRenterSignUp = createAsyncThunk(
  'auth/authenticateRenterSignup',
  async ({ username, password, firstname, lastname, email, role, zipcode, method }, thunkAPI) => {
    try {
      const res = await axios.post(`/auth/${method}`, { username, password, firstname, lastname, email, role, zipcode });
      window.localStorage.setItem(TOKEN, res.data.token);
      thunkAPI.dispatch(me(role));
    } catch (err) {
      if (err.response.data) {
        return thunkAPI.rejectWithValue(err.response.data);
      } else {
        return 'There was an issue with your request.';
      }
    }
  }
);


/*
  SLICE
*/
export const authSlice = createSlice({
  name: "auth",
  initialState: {
    me: {},
    error: null,
  },
  reducers: {
    logout(state, action) {
      window.localStorage.removeItem(TOKEN);
      state.me = {};
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(me.fulfilled, (state, action) => {
      state.me = action.payload;
    });
    builder.addCase(me.rejected, (state, action) => {
      state.error = action.error;
    });
    builder.addCase(authenticateLogin.rejected, (state, action) => {
      state.error = action.payload;
    });
    builder.addCase(authenticateRenterLogin.rejected, (state, action) => {
      state.error = action.payload;
    });
    builder.addCase(authenticateSignUp.rejected, (state, action) => {
      state.error = action.payload;
    });
    builder.addCase(authenticateRenterSignUp.rejected, (state, action) => {
      state.error = action.payload;
    });
  },
});

/*
  ACTIONS
*/
export const { logout } = authSlice.actions;

/*
  REDUCER
*/
export default authSlice.reducer;
