import { MasterCardIcon, VisaIcon } from "@/assets/icons";
import { URL_PAYMENT_CARDS } from "@/commons/constants/apiUrl";
import useFetch from "@/commons/hooks/useFetch";
import { Box } from "@mui/material";
import * as React from "react";
import { useRef } from "react";
import {
  CardInformation,
  PayMentCartDetail,
  PersonalInformationWrapper,
  TextPersonalLabel
} from "./styles";

interface Props {}

const patterns = [
  {
    pattern: /^4[0-9]{6,}$/,
    icon: <VisaIcon />,
    type: "visa",
  },
  {
    pattern: /^5[1-5][0-9]{5,}|222[1-9][0-9]{3,}|22[3-9][0-9]{4,}|2[3-6][0-9]{5,}|27[01][0-9]{4,}|2720[0-9]{3,}$/,
    icon: <MasterCardIcon />,
    type: "mastercard",
  },
  {
    pattern: /^3[47][0-9]{5,}$/,
    icon: <VisaIcon />,
    type: "amex",
  },
  {
    pattern: /^6(?:011|5[0-9]{2})[0-9]{3,}$/,
    icon: <VisaIcon />,
    type: "discover",
  },
  {
    pattern: /^3(?:0[0-5]|[68][0-9])[0-9]{4,}$/,
    icon: <VisaIcon />,
    type: "dinersclub",
  },
  {
    pattern: /^(?:2131|1800|35[0-9]{3})[0-9]{3,}$/,
    icon: <VisaIcon />,
    type: "jcb",
  },
];

const formatDate = (dateString: string): string => {
  const month = dateString.substring(0, 2);
  const year = dateString.substring(2, 6);
  return `${month}/${year}`;
};

const PaymentCard: React.FC<Props> = () => {
  const fetchDataRef = useRef(() => {});
  const { data, loading, refresh } = useFetch<PaymentCard[]>(URL_PAYMENT_CARDS);

  fetchDataRef.current = () => {
    refresh();
  };

  const renderCardIcon = (cardNumber: string) => {
    for (let i = 0; i < patterns.length; i++) {
      if (patterns[i].pattern.test(cardNumber)) {
        return patterns[i].icon;
      }
    }
    return patterns[0].icon;
  };

  return (
    <>
      <PersonalInformationWrapper>
        <Box>
          <TextPersonalLabel style={{ marginBottom: "30px" }}>
            <span>Payment card</span>
          </TextPersonalLabel>

          {data?.map((card: PaymentCard, index) => {
            return (
              <PayMentCartDetail key={index}>
                {renderCardIcon(card.card_no)}
                <CardInformation key={index}>
                  <p>{card.card_no}</p>
                  <span>Expires on {formatDate(card.exp_date)}</span>
                </CardInformation>
              </PayMentCartDetail>
            );
          })}
        </Box>
      </PersonalInformationWrapper>
    </>
  );
};

export default PaymentCard;
