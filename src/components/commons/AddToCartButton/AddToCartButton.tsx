import { Theme } from "@mui/material";
import { SystemProps } from "@mui/system";
import { useDispatch, useSelector } from "react-redux";
import { StyledButton, StyledCartIcon } from "./styles";
import { cartActions } from "@/redux/reducer/cartReducer";
import { systemActions } from "@/redux/reducer/systemReducer";

interface Props extends SystemProps<Theme> {
  product: ProductV2 | ProductItem;
  children?: React.ReactNode;
  render?: (isReadyCart: boolean) => React.ReactNode;
}
const AddToCartButton: React.FC<Props> = ({ product, children, render, ...props }) => {
  const { userInfo } = useSelector((state: RootState) => state.user);
  const { carts } = useSelector((state: RootState) => state.cart);
  const cartStore = Object.values(carts)?.[0]?.[0];
  const isReadyCart = false;
  const dispatch = useDispatch();

  const handleCheckIsCartEmpty = () => {
    return cartStore && cartStore.product_items?.length > 0 ? false : true;
  };

  const handleCheckIsNewProductSameStore = () => {
    const { store } = product;
    const isSameStore = cartStore.store.id === store.id && cartStore.store.merchant_id === store.merchant_id;

    if (isSameStore) {
      dispatch(cartActions.setAddCartModal({ ...product }));
    } else {
      dispatch(cartActions.setCurrentSelectedItem({ ...product }));
      dispatch(systemActions.setDisplayAuthModal("warning-cart-not-empty"));
    }
  };

  const handleCheckCartBeforeAdd = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (!userInfo) return dispatch(systemActions.setDisplayAuthModal("login"));

    if (handleCheckIsCartEmpty()) {
      dispatch(cartActions.setAddCartModal({ ...product }));
    } else {
      handleCheckIsNewProductSameStore();
    }
  };

  return (
    <StyledButton onClick={handleCheckCartBeforeAdd} active={isReadyCart ? 1 : 0} {...props}>
      {render?.(isReadyCart) || children || <StyledCartIcon />}
    </StyledButton>
  );
};

export default AddToCartButton;
