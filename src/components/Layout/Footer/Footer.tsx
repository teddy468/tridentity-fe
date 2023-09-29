import {
  FacebookIcon,
  FacebookLightIcon,
  InstagramIcon,
  InstagramIconLight,
  LinkedInIcon,
  LinkedInLightIcon,
  SmsIcon,
  TriFooterLogo,
  TwitterIcon,
  TwitterIconLight,
} from "@/assets/icons";
import { FOOTER_ITEMS } from "@/commons/constants/footer";
import {
  EmailTextField,
  FlexBox,
  FooterMenuContainerFirst,
  FooterMenuItem,
  SectionContainer,
  SectionContent,
  SectionRightWrapper,
  SocialMediaContainer,
  SocialMediaItem,
  SubmitButton,
} from "@/components/Layout/Footer/styles";
import { Box, Divider, InputAdornment, Typography } from "@mui/material";
import Link from "next/link";
import { FC, useState } from "react";

type IconStatus = {
  [key: number]: boolean;
};

const Footer: FC = () => {
  const [highlight, setHighlight] = useState<IconStatus>({
    1: false,
    2: false,
    3: false,
    4: false,
  });
  const socialMediaItems: ISocialMedia[] = [
    {
      id: 1,
      name: "LinkedIn",
      link: "https://www.linkedin.com/",
      icon: <LinkedInIcon />,
      iconHighlight: <LinkedInLightIcon />,
    },
    {
      id: 2,
      name: "Facebook",
      link: "https://www.facebook.com/",
      icon: <FacebookIcon />,
      iconHighlight: <FacebookLightIcon />,
    },
    {
      id: 4,
      name: "Instagram",
      link: "https://www.instagram.com/",
      icon: <InstagramIcon />,
      iconHighlight: <InstagramIconLight />,
    },
    {
      id: 3,
      name: "Twitter",
      link: "https://twitter.com/",
      icon: <TwitterIcon />,
      iconHighlight: <TwitterIconLight />,
    },
  ];

  const renderSocialIcon = (item: ISocialMedia, idx: number) => {
    if (highlight[idx]) {
      return item.iconHighlight;
    }
    return item.icon;
  };

  return (
    <SectionContainer>
      <SectionContent maxWidth="lg">
        <FlexBox>
          <SectionRightWrapper>
            <Box>
              <TriFooterLogo />
              <SocialMediaContainer>
                {socialMediaItems.map((item, index) => (
                  <Link href={item.link} target="" aria-details={item.name} key={index}>
                    <SocialMediaItem
                      key={item.name}
                      onMouseEnter={() => setHighlight({ ...highlight, [index]: true })}
                      onMouseLeave={() => setHighlight({ ...highlight, [index]: false })}
                    >
                      {renderSocialIcon(item, index)}
                    </SocialMediaItem>
                  </Link>
                ))}
              </SocialMediaContainer>
            </Box>
            <FooterMenuContainerFirst>
              {FOOTER_ITEMS.map((items: MenuItem, index: number) => (
                <FooterMenuItem href={items.link} target={"_blank"}>
                  {items.name}
                </FooterMenuItem>
              ))}
            </FooterMenuContainerFirst>
          </SectionRightWrapper>
          <Box display={"flex"} flexDirection="column" justifyContent={"flex-end"}>
            <Typography fontWeight={500} fontSize="16px" lineHeight={"24px"} color="grey.100">
              Subscribe to Our Newsletter
            </Typography>
            <Box
              sx={{
                display: "flex",
                mt: "12px",
                alignItems: "center",
              }}
            >
              <EmailTextField
                placeholder="Your email address"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SmsIcon />
                    </InputAdornment>
                  ),
                }}
              />
              <SubmitButton>Submit</SubmitButton>
            </Box>
          </Box>
        </FlexBox>

        <Divider
          sx={{
            bgcolor: "grey.400",
            my: "44px",
          }}
        />
        <Box display={"flex"} alignItems="center" justifyContent={"center"}>
          <Typography fontSize="14px" lineHeight={"20px"} color="grey.400">
            © 2022 by Tridentity. All rights reserved
          </Typography>
        </Box>
      </SectionContent>
    </SectionContainer>
  );
};

export default Footer;
