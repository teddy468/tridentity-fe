import { ArrowDownIcon } from "@/assets/icons";
import {
  URL_USER_LP,
  URL_USER_MEMBERSHIP,
  URL_USER_MEMBERSHIP_COLLECTION,
  URL_USER_MEMBERSHIP_CONFIG,
} from "@/commons/constants/apiUrl";
import { MembershipTypes } from "@/commons/constants/user";
import useFetch from "@/commons/hooks/useFetch";
import useToast from "@/commons/hooks/useToast";
import { getMembershipType } from "@/commons/utils/getMembershipType";
import { upgradeMembership } from "@/redux/requests/userRequests";
import moment from "moment";
import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import CustomSlider from "../commons/CustomSlider/CustomSlider";
import CustomTabs from "../commons/CustomTabs/CustomTabs";
import MembershipCard from "./MembershipCard/MembershipCard";
import {
  Collection,
  CurrentPoints,
  CustomAccordion,
  CustomAccordionDetails,
  MemberShipCollectionWrapper,
  MembershipCardItem,
  MembershipPerks,
  MembershipPerksPanel,
  MembershipTitle,
  MembershipUserInfo,
  MembershipUserInfoWrapper,
  MembershipWrapper,
  Point,
  StyledMembershipCard,
  StyledUl,
  TabsWrapper,
  Title,
  UpgradeButton,
  UpgradeInfo,
  UpgradePointsNeeded,
} from "./styles";
import CongratulationModal from "./UpgradeModals/CongratulationModal";
import UpgradeModal from "./UpgradeModals/UpgradeModal";
import { get, multiply } from "lodash";
import { formatLP } from "@/utils/formatNumber";
import { AccordionSummary } from "@mui/material";

const tabs = [
  {
    label: MembershipTypes.BRONZE,
    key: 0,
  },
  {
    label: MembershipTypes.SILVER,
    key: 1,
  },
  {
    label: MembershipTypes.GOLD,
    key: 2,
  },
  {
    label: MembershipTypes.DIAMOND,
    key: 3,
  },
];
const Membership = () => {
  const toast = useToast();
  const { data: userLoyaltyPoint, refresh: fetchUserLoyaltyPoint } = useFetch<UserLoyaltyPoint>(URL_USER_LP);
  const { data: userMemembership, refresh: fetchUserMembership } = useFetch<UserMembership>(URL_USER_MEMBERSHIP);
  const { data: memberShipCollection } = useFetch<UserMembership[]>(URL_USER_MEMBERSHIP_COLLECTION);
  const { data: userMembershipConfig } = useFetch<UserMembershipConfig>(URL_USER_MEMBERSHIP_CONFIG);
  const [collapsed, setCollapsed] = useState<boolean>(true);
  const userInfo = useSelector((state: RootState) => state.user.userInfo);
  const [activeTab, setActiveTab] = useState<number>(0);
  const [openUpgradeModal, setOpenUpgradeModal] = useState<boolean>(false);
  const [openCongratulationModal, setOpenCongratulationModal] = useState<boolean>(false);

  useEffect(() => {
    if (!userMemembership) return;

    setActiveTab(userMemembership.level);
  }, [userMemembership]);

  const LPNeededToUpgrade = useMemo(() => {
    if (!userMemembership || !userMembershipConfig || !userLoyaltyPoint) return 0;

    if (userMembershipConfig.level[userMemembership?.level + 1]?.value - userLoyaltyPoint.point < 0) return 0;

    return userMembershipConfig.level[userMemembership?.level + 1]?.value - formatLP(userLoyaltyPoint.point);
  }, [userMemembership, userMembershipConfig, userLoyaltyPoint]);

  const handleUpgrade = async () => {
    if (!userMemembership || !userInfo) return;
    try {
      const body: UpgradeMembershipBody = {
        id: userMemembership.id,
        level: userMemembership.level + 1,
        active_date: userMemembership.active_date,
        status: userMemembership.status,
        create_time: userMemembership.create_time,
        update_time: userMemembership.update_time,
        user_id: userInfo.id,
      };
      const res = await upgradeMembership(body);
      if (res) {
        toast.success("Upgrade successfully");
        fetchUserLoyaltyPoint();
        fetchUserMembership();
        setOpenCongratulationModal(true);
      }
    } catch (error) {
      toast.error("Loyalty Points Insufficient");
      console.log(error);
    }
    setOpenUpgradeModal(false);
  };
  if (!userInfo || !userLoyaltyPoint || !userMemembership || !userMembershipConfig) return null;

  return (
    <>
      <MembershipWrapper>
        <MembershipUserInfoWrapper>
          <StyledMembershipCard
            name={userInfo.full_name}
            id={userMemembership?.token_id}
            issueDate={moment(userMemembership?.active_date).format("MM/DD/YYYY")}
            type={getMembershipType(userMemembership?.level)}
          />
          <MembershipUserInfo>
            <CurrentPoints>
              Current Loyalty Points: <Point>{formatLP(userLoyaltyPoint?.point)}</Point>
            </CurrentPoints>
            {userMemembership?.level < 3 && (
              <CustomSlider
                marks={[
                  {
                    value: 0,
                    label: getMembershipType(userMemembership.level),
                  },
                  {
                    value: userMembershipConfig.level[userMemembership.level + 1]?.value,
                    label: getMembershipType(userMemembership.level + 1),
                  },
                ]}
                min={0}
                max={userMembershipConfig.level[userMemembership.level + 1]?.value}
                value={userLoyaltyPoint.point}
              />
            )}

            {userMemembership?.level >= 3 && (
              <CustomSlider
                marks={[
                  {
                    value: userMembershipConfig.level[userMemembership.level - 1].value,
                    label: getMembershipType(userMemembership.level - 1),
                  },
                  {
                    value: userMembershipConfig.level[userMemembership.level].value,
                    label: getMembershipType(userMemembership.level),
                  },
                ]}
                min={userMembershipConfig.level[userMemembership.level - 1].value}
                max={userMembershipConfig.level[userMemembership.level].value}
                value={userMembershipConfig.level[userMemembership.level].value}
              />
            )}

            {userMemembership?.level < 3 && (
              <UpgradeInfo>
                <UpgradePointsNeeded>{LPNeededToUpgrade}</UpgradePointsNeeded> more Loyalty points to reach{" "}
                {getMembershipType(userMemembership.level + 1)}
              </UpgradeInfo>
            )}

            {userMemembership?.level >= 3 && (
              <UpgradeInfo style={{ textAlign: "center" }}>
                Congratulations! You have reached the highest membership
              </UpgradeInfo>
            )}
          </MembershipUserInfo>
        </MembershipUserInfoWrapper>
        <MembershipPerksPanel>
          <Title>Membership Perks</Title>
          <TabsWrapper>
            <CustomTabs tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab}>
              <MembershipPerks>
                <MembershipTitle>Membership Perk</MembershipTitle>
                <StyledUl>
                  <li>Applicable to any product on Tridentity Marketplace</li>
                  <li>
                    Reward LP is{" "}
                    {parseFloat(
                      multiply(get(userMembershipConfig, `perks.${activeTab}.raw_value.extra_lp`, 0), 100).toFixed(10)
                    )}
                    % of subtotal
                  </li>
                </StyledUl>
              </MembershipPerks>
            </CustomTabs>
          </TabsWrapper>
        </MembershipPerksPanel>

        <MemberShipCollectionWrapper>
          <CustomAccordion
            expanded={collapsed}
            onChange={() => {
              setCollapsed(!collapsed);
            }}
          >
            <AccordionSummary
              aria-controls="panel1bh-content"
              id="panel1bh-header"
              sx={{ background: "#212124", borderRadius: "16px", padding: "0px 0px" }}
              expandIcon={<ArrowDownIcon />}
            >
              <Title>Membership Collection</Title>
            </AccordionSummary>

            <CustomAccordionDetails>
              <Collection>
                {memberShipCollection &&
                  memberShipCollection.map((item, index) => (
                    <MembershipCardItem key={index}>
                      <MembershipCard
                        name={userInfo.full_name}
                        id={item.token_id}
                        issueDate={moment(item?.active_date).format("MM/DD/YYYY")}
                        type={getMembershipType(item.level)}
                      />
                    </MembershipCardItem>
                  ))}
              </Collection>
            </CustomAccordionDetails>
          </CustomAccordion>
        </MemberShipCollectionWrapper>
      </MembershipWrapper>
      <UpgradeModal
        isOpen={openUpgradeModal}
        onClose={() => setOpenUpgradeModal(false)}
        onUpgrade={handleUpgrade}
        nextLevelMembership={userMembershipConfig.level[userMemembership.level + 1]}
        userLoyaltyPoint={userLoyaltyPoint}
      />
      <CongratulationModal
        isOpen={openCongratulationModal}
        onClose={() => setOpenCongratulationModal(false)}
        nextLevelMembership={userMembershipConfig.level[userMemembership.level]}
      />
    </>
  );
};

export default Membership;
