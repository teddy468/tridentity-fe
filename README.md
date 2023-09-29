# Tridentity Frontend

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

### Prerequisites

In order to compile and run everything you will need:

- Node installed (^[v18.15.0](https://nodejs.org/en/blog/release/v18.15.0/) recommended)

- Yarn installed (^1.22.19 recommended)

## Install and Setup

Install the app with yarn:

### `yarn install`

Then copy file env.example and rename it to .env:

### Update `NEXT_PUBLIC_BASE_URL_V2`

Update NEXT_PUBLIC_BASE_URL_V2 environment with api url.

### Update `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY`

Update NEXT_PUBLIC_GOOGLE_MAPS_API_KEY for google map api.

## Start with localhost

Runs the app in the development mode.

### `yarn dev`

The application will run by default on port 3111. If you want to run the application on another port, please change the dev script in the package.json file.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Build into production

### `yarn build`

Builds the app for production to the `.next` folder. After run:

### `yarn start`

for start production mode.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

# Introduction to development

### Config prettier

- Select Prectter for Default formatter

### Add New Page

- Go to `src/pages/` and add a new file `[page_path].tsx`
- You can type `tsrafce` to auto create and export template Typescript Arrow Function Component.

### Add New Component

#### `Step 1:`

- Go to `src/components/` and add a new folder with `PascalCase` name (eg: LoginForm).
- In LoginForm folder, add a new file `LoginForm.tsx` (PascalCase name too).
- You can type `tsrafce` to auto create and export template Typescript Arrow Function Component.

#### `Step 2:`

- In LoginForm folder, add a new file `styles.ts`.
- Create a new StyledComponent by `@mui/material`.
- Import StyledComponent to `LoginForm.tsx` for use.

### Store and actions

- This app uses redux-toolkit with redux-saga for state management.
- For create a new state from the store, do the steps below:

#### `Step 1:` Add a new reducer

Create new s reducer in the `src/redux/reducer` folder follow to `userReducer.ts` template:

- Defined State interface.
- Create initialState.
- Create a new Slice with name is reducer name, initialState and reducers object by createSlice
- In reducers object, create new case (by function name).
- Export `actions` and `reducer` from this Slice
- Go to `src/redux/reducer/index.ts` and add created reducer to `combineReducers` parameter object

#### `Step 2:` Add a new request function

If you don't need call api to get data, you can skip this step.

Create new a request function in the `src/redux/requests` folder follow to userRequests.ts template:

- Create global Response type to `src/types` follow to user.d.ts.
- Create and export function return AxiosResponse Promise with created type.

#### `Step 3:` Add a new saga actions

Create new saga action in the `src/redux/saga` folder follow to `userSagas.ts` template:

- Create and export new action name with `createAction`. The new action name must have the suffix `Sync` to distinguish it from reducer action.
  Please defined payload with a type or `CallbackPayload` if you want pass callback function.
- Create a new generator function saga action with try/catch required.
- In generator function saga action, you can get data from api with `yield call()` (eg: `yield call(userRequests.login, body)`). You can dispatch reducer action and saga action with `yield put()` (eg: `yield put(reducerActions.setState(newState))`)
- Create and export a generator function saga action to takeLatest all saga action defined.
- Go to `src/redux/saga/index.ts` and add created saga action to `rootSagas`.

#### `Step 4:` Get state and dispatch action.

- Use `useSelector` from `redux` with global type `RootState` for parameter to get state from store.
- Use `dispatch = useDispatch()` and `dispatch(reducerActions.setState(newState)` or `dispatch(sagaActionSync(params)` to update store or dispatch async actions.
