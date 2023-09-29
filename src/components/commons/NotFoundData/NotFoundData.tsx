import { NotFoundWrapper, TextContent } from "./styles";

interface Props {
  text: string;
}
const NotFoundData = ({ text }: Props) => {
  return (
    <NotFoundWrapper>
      <img src="/blank-states/empty-list.svg" alt="empty" />
      <TextContent>Sorry, we couldn’t find the {text} you’re looking for</TextContent>
    </NotFoundWrapper>
  );
};

export default NotFoundData;
