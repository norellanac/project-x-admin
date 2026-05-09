# projectx-admin — Agent Context

## Role
This is the **Admin Dashboard** — the only app with write access to the branding/customization module. Admins configure colors, logos, copy, feature flags, and links here. The web user app and mobile app are read-only consumers; all edits happen here.

## Tech Stack
| | |
|---|---|
| Framework | React 19 + Vite + TypeScript |
| State | Redux Toolkit + redux-persist (localStorage) |
| UI library | MUI v9 (Material UI) + Emotion |
| Forms | Formik + Yup |
| i18n | i18next + react-i18next |
| Routing | React Router DOM v7 |
| HTTP | RTK Query (`createApi` + `baseQueryWithReauth`) |

## Source Layout
```
src/
├── features/
│   ├── auth/           # Login page, header, sidebar organisms
│   ├── dashboard/      # Dashboard and settings pages
│   ├── users/          # User management
│   └── branding/       # ← Customization module (TO BE BUILT)
├── components/
│   ├── atoms/          # Smallest UI units
│   ├── molecules/      # Composed atoms
│   ├── organisms/      # Complex sections
│   └── templates/      # Page layouts
├── services/           # RTK Query API files (one per resource)
│   └── brandingApi.ts  # Already exists — needs to be expanded
├── redux/
│   ├── slices/         # RTK slices
│   └── store/store.ts  # Redux store with persist
├── routes/
│   ├── AppRouter.tsx         # Root router (login vs app)
│   └── AuthenticatedApp.tsx  # Protected routes layout
├── styles/
│   ├── contexts/ThemeProvider.tsx  # MUI theme context with toggle
│   └── themes/                     # light/dark theme definitions
├── hooks/              # Custom hooks (useAppSelector, etc.)
├── types/              # TypeScript interfaces
└── assets/
    └── tranlsations/   # en.json, es.json
```

## Key Conventions
- **API calls**: use RTK Query `createApi` with `baseQueryWithReauth` (handles token refresh). One `createApi` per resource domain, file in `services/`.
- **State**: regular Redux slices for UI state; RTK Query for server state. Register both in `store.ts`.
- **Forms**: Formik + Yup for all forms. No raw `onChange` state.
- **Navigation**: React Router DOM v7. Add new pages to `AuthenticatedApp.tsx` (protected routes).
- **Sidebar**: add new menu items to the `AuthSidebar` organism.
- **Theme**: MUI `sx` prop or `styled()`. Access palette via `useTheme()`. Do NOT hardcode colors.
- **Imports**: uses path alias `@/` → `src/`. Example: `import { foo } from '@/features/bar/Foo'`.
- **i18n**: wrap all user-visible strings with `useTranslation()` / `t('key')`. Add keys to both `en.json` and `es.json`.

## Scripts
```bash
yarn dev          # Vite dev server
yarn build        # tsc + Vite build
yarn lint         # ESLint
yarn extract      # i18next-parser — extract new i18n keys
yarn format       # Prettier
```

## Environment Variables
```
VITE_BASE_API_URL         # e.g. http://localhost:8000/api/v1
VITE_FACEBOOK_APP_ID
VITE_FACEBOOK_SDK_VERSION
VITE_APP_VERSION
```

---

## Customization / Branding Module — Admin's Role: EDITOR

The admin is the **only app that writes** branding config. It calls the backend API and provides a full management UI.

### Backend API (already implemented)
| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/branding` | Load current config |
| PUT | `/branding` | Save text/color/flag fields (JSON body) |
| POST | `/branding/assets/:type` | Upload image (`logo\|icon\|splash\|favicon\|defaultImage\|slider`) via multipart |
| DELETE | `/branding/slider/:index` | Remove a slider image |

### What needs to be built in this project

#### 1. Expand `src/services/brandingApi.ts`
The file exists but only has `projectName`, `primaryColor`, `secondaryColor`, `logoUrl`. Replace the `Branding` interface and add the image upload + slider delete endpoints.

Full `BrandingConfig` shape (mirrors backend model):
```typescript
interface BrandingColors {
  primary: string; primaryContainer: string;
  secondary: string; secondaryContainer: string;
  tertiary: string; tertiaryContainer: string;
  error: string; errorContainer: string;
  background: string; surface: string;
  textPrimary: string; textSecondary: string;
  onPrimary: string; onSecondary: string; onTertiary: string;
}
interface BrandingFeatures {
  chatEnabled: boolean; tasksEnabled: boolean; newsletterEnabled: boolean;
  socialAuthEnabled: boolean; darkModeEnabled: boolean; biometricsEnabled: boolean;
}
interface BrandingConfig {
  id: number;
  appName: string; tagline: string; legalName: string;
  logoUrl: string | null; iconUrl: string | null; splashUrl: string | null;
  faviconUrl: string | null; defaultImageUrl: string | null;
  sliderImages: string[];
  colorsLight: BrandingColors; colorsDark: BrandingColors;
  fontFamily: string; buttonBorderRadius: number;
  termsUrl: string; privacyUrl: string; supportUrl: string;
  privacyEmail: string; legalEmail: string; companyAddress: string;
  mailchimpApiUrl: string;
  features: BrandingFeatures;
  copyOverrides: Record<string, Record<string, string>>;
}
```

Endpoints to add:
- `uploadAsset`: POST `/branding/assets/:type` with `FormData` (field name: `file`)
- `removeSliderImage`: DELETE `/branding/slider/:index`

#### 2. Create `src/redux/slices/brandingSlice.ts`
Store the fetched config so other parts of the admin UI (header, logo) can consume it without refetching.

#### 3. Register in `src/redux/store/store.ts`
Add `brandingApi.reducer`, `brandingApi.middleware`, and the slice reducer.

#### 4. Create `src/features/branding/` feature
Build a full branding management page with tabs or sections:

| Section | Fields |
|---|---|
| **Identity** | App name, tagline, legal name, font family, button border radius |
| **Logos & Images** | Logo, icon, splash, favicon, default image, slider images (upload + preview + delete) |
| **Colors — Light** | All 15 color tokens (color picker input) |
| **Colors — Dark** | All 15 color tokens (color picker input) |
| **Links & Legal** | Terms URL, privacy URL, support URL, privacy email, legal email, company address, Mailchimp API URL |
| **Feature Flags** | Toggle switches for all 6 flags |
| **Copy Overrides** | Key-value editor per language (en, es) |

#### 5. Register route in `src/routes/AuthenticatedApp.tsx`
Add `<Route path="branding" element={<BrandingPage />} />` and add "Branding" to the sidebar.

### Color picker
Use `<input type="color" />` wrapped in an MUI component — no extra dependencies needed.

### Image uploads
Use `FormData` with field name `file` (consistent with other upload endpoints in the app).

### Important constraint
- The admin WRITES branding. It should NOT apply branding config to its own theme (admin always stays in its default theme to remain neutral and usable regardless of client config).
