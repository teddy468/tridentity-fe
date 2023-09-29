import { Theme } from "@mui/material";
import { SystemProps } from "@mui/system";
import { useDispatch, useSelector } from "react-redux";
import { StyledButton, StyledCartIcon } from "./styles";
import { cartActions } from "@/redux/reducer/cartReducer";
import { systemActions } from "@/redux/reducer/systemReducer";

interface Props extends SystemProps<Theme> {
  product: CartProductV2;
  children?: React.ReactNode;
  render?: (isReadyCart: boolean) => React.ReactNode;
}
const UpdateCartButton: React.FC<Props> = ({ product, children, render, ...props }) => {
  const { userInfo } = useSelector((state: RootState) => state.user);
  const isReadyCart = false;
  const dispatch = useDispatch();

  const handleToggleCart = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (userInfo) dispatch(cartActions.setUpdateCartModal({ ...product }));
    else dispatch(systemActions.setDisplayAuthModal("login"));
  };

  return (
    <StyledButton onClick={handleToggleCart} active={isReadyCart ? 1 : 0} {...props}>
      {render?.(isReadyCart) || children || <StyledCartIcon />}
    </StyledButton>
  );
};

export default UpdateCartButton;
