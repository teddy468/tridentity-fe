import { END } from "redux-saga";
import { getAllCategoriesAsync } from "@/redux/saga/systemSagas";
import { wrapper } from "@/redux/store";

export const getStaticProps = wrapper.getStaticProps(({ sagaTask, dispatch }) => async () => {
  dispatch(getAllCategoriesAsync({ payload: undefined }));
  dispatch(END);
  await sagaTask?.toPromise();
  return { props: {} };
});
