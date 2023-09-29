import { MembershipTypes } from "@/commons/constants/user";
import { Detail, Info, MembershipCardWrapper, UserFullName } from "./styles";

interface MembershipCardProps {
  name: string;
  id: string;
  issueDate: string;
  type: MembershipTypes;
}
const MembershipCard = ({ name, id, issueDate, type, ...props }: MembershipCardProps) => {
  return (
    <MembershipCardWrapper {...props}>
      <img src={`/membership-cards/${type.toLowerCase()}.png`} />
      <Info>
        <Detail style={{ marginTop: 16 }}>Issue Date</Detail>
        <Detail>{issueDate}</Detail>
      </Info>
    </MembershipCardWrapper>
  );
};
export default MembershipCard;
