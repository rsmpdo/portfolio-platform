import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API from '../services/api';
import { templateLayouts } from '../data/templateLayouts';

// Fetch current user's CMS layout for editing (supports optional layoutId)
export const fetchUserLayout = createAsyncThunk(
  'layout/fetchUserLayout',
  async (layoutId, { rejectWithValue }) => {
    try {
      const url = layoutId ? `/layouts/me?id=${layoutId}` : '/layouts/me';
      const res = await API.get(url);
      return res.data.layout;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch layout');
    }
  }
);

// Fetch all portfolios created by current user
export const fetchUserPortfolios = createAsyncThunk(
  'layout/fetchUserPortfolios',
  async (_, { rejectWithValue }) => {
    try {
      const res = await API.get('/layouts/my-portfolios');
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch user portfolios');
    }
  }
);

// Save entire layout changes to backend database
export const saveUserLayout = createAsyncThunk(
  'layout/saveUserLayout',
  async (layoutData, { rejectWithValue }) => {
    try {
      const res = await API.put('/layouts/me', layoutData);
      return res.data.layout;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to save layout');
    }
  }
);

// Fetch public portfolio layout by user handle
export const fetchPublicLayout = createAsyncThunk(
  'layout/fetchPublicLayout',
  async (handle, { rejectWithValue }) => {
    try {
      const res = await API.get(`/layouts/public/${handle}`);
      return res.data.layout;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Portfolio not found');
    }
  }
);

const layoutSlice = createSlice({
  name: 'layout',
  initialState: {
    activeLayout: null,
    userPortfolios: [],
    maxAllowedPortfolios: 1,
    publicLayout: null,
    selectedComponentId: null,
    isSaving: false,
    loading: false,
    error: null,
    saveSuccess: false
  },
  reducers: {
    selectComponent: (state, action) => {
      state.selectedComponentId = action.payload;
    },
    updateComponentProps: (state, action) => {
      const { id, props } = action.payload;
      if (!state.activeLayout) return;
      const comp = state.activeLayout.components.find((c) => c.id === id);
      if (comp) {
        comp.props = { ...comp.props, ...props };
      }
    },
    updateComponentVisibility: (state, action) => {
      const { id, isVisible } = action.payload;
      if (!state.activeLayout) return;
      const comp = state.activeLayout.components.find((c) => c.id === id);
      if (comp) {
        comp.isVisible = isVisible;
      }
    },
    addComponent: (state, action) => {
      if (!state.activeLayout) return;
      const newComp = {
        id: `comp_${Date.now()}`,
        type: action.payload.type,
        title: action.payload.title || action.payload.type,
        order: state.activeLayout.components.length,
        isVisible: true,
        props: action.payload.defaultProps || {}
      };
      state.activeLayout.components.push(newComp);
      state.selectedComponentId = newComp.id;
    },
    removeComponent: (state, action) => {
      if (!state.activeLayout) return;
      state.activeLayout.components = state.activeLayout.components.filter(
        (c) => c.id !== action.payload
      );
      if (state.selectedComponentId === action.payload) {
        state.selectedComponentId = null;
      }
    },
    reorderComponents: (state, action) => {
      if (!state.activeLayout) return;
      const { sourceIndex, destinationIndex } = action.payload;
      const result = Array.from(state.activeLayout.components);
      const [removed] = result.splice(sourceIndex, 1);
      result.splice(destinationIndex, 0, removed);
      // Re-assign order values
      state.activeLayout.components = result.map((comp, idx) => ({
        ...comp,
        order: idx
      }));
    },
    updateTheme: (state, action) => {
      if (!state.activeLayout) return;
      state.activeLayout.theme = { ...state.activeLayout.theme, ...action.payload };
    },
    updateSeo: (state, action) => {
      if (!state.activeLayout) return;
      state.activeLayout.seo = { ...state.activeLayout.seo, ...action.payload };
    },
    updateHandle: (state, action) => {
      if (!state.activeLayout) return;
      state.activeLayout.handle = action.payload.toLowerCase();
    },
    clearSaveSuccess: (state) => {
      state.saveSuccess = false;
    },
    applyTemplate: (state, action) => {
      const templateId = action.payload;
      const template = templateLayouts[templateId];
      if (template && state.activeLayout) {
        state.activeLayout.theme = { 
          ...state.activeLayout.theme, 
          ...template.theme,
          templateId 
        };
        state.activeLayout.components = template.components.map((c, i) => ({
          id: `comp_${Date.now()}_${i}`,
          type: c.type,
          title: c.title,
          order: i,
          isVisible: true,
          props: c.props ? { ...c.props } : {}
        }));
        if (state.activeLayout.components.length > 0) {
          state.selectedComponentId = state.activeLayout.components[0].id;
        }
      }
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch user layout
      .addCase(fetchUserLayout.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserLayout.fulfilled, (state, action) => {
        state.loading = false;
        state.activeLayout = action.payload;
        if (action.payload?.components?.length > 0 && !state.selectedComponentId) {
          state.selectedComponentId = action.payload.components[0].id;
        }
      })
      .addCase(fetchUserLayout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch user portfolios
      .addCase(fetchUserPortfolios.fulfilled, (state, action) => {
        state.userPortfolios = action.payload.layouts || [];
        state.maxAllowedPortfolios = action.payload.maxAllowed || 1;
      })
      // Save user layout
      .addCase(saveUserLayout.pending, (state) => {
        state.isSaving = true;
        state.saveSuccess = false;
      })
      .addCase(saveUserLayout.fulfilled, (state, action) => {
        state.isSaving = false;
        state.saveSuccess = true;
        state.activeLayout = action.payload;
      })
      .addCase(saveUserLayout.rejected, (state, action) => {
        state.isSaving = false;
        state.error = action.payload;
      })
      // Public layout
      .addCase(fetchPublicLayout.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPublicLayout.fulfilled, (state, action) => {
        state.loading = false;
        state.publicLayout = action.payload;
      })
      .addCase(fetchPublicLayout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const {
  selectComponent,
  updateComponentProps,
  updateComponentVisibility,
  addComponent,
  removeComponent,
  reorderComponents,
  updateTheme,
  updateSeo,
  updateHandle,
  clearSaveSuccess,
  applyTemplate
} = layoutSlice.actions;

export default layoutSlice.reducer;
