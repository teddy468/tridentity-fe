import dayjs from "dayjs";
import { useMemo } from "react";
import { Col, Row } from "../ProductsCart/styles";

export const VoucherInfoByProduct = ({ voucher }: any) => {
  const appliedProducts = useMemo(() => {
    return voucher?.voucherProducts as any[];
  }, [voucher?.voucherProducts]);

  const isDiscount = useMemo(() => {
    return Number(voucher?.discount_amount) > 0;
  }, [voucher?.discount_amount]);

  const textFreeProduct = useMemo(() => {
    if (voucher?.freeProductItem) {
      return `${voucher?.freeProductItem?.product.name} ${voucher?.freeProductItem?.attribute_name} - ${voucher?.freeProductItem?.attribute_value}`;
    }
  }, [voucher?.freeProductItem]);
  return (
    <Row>
      <Col style={{ width: "20%" }}>
        {isDiscount ? ` $S ${voucher?.discount_amount} OFF` : `Free ${textFreeProduct}`}
      </Col>
      <Col style={{ width: "30%" }}>
        Applied to{" "}
        {appliedProducts.map((prod, index) => {
          return (
            <span>
              {prod?.product?.name} {appliedProducts.length === 1 || index === appliedProducts.length - 1 ? "" : ", "}
            </span>
          );
        })}
      </Col>
      <Col style={{ width: "25%" }}>
        Valid till: {dayjs(voucher?.end_date).isValid() && dayjs(voucher?.end_date).format("DD/MM/YYYY")}
      </Col>
      <Col style={{ width: "25%" }}>Voucher name : {voucher?.name}</Col>
    </Row>
  );
};
