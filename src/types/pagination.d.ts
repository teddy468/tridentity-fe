declare type ORDER_BYS = import("../commons/constants/pagination").ORDER_BYS;

declare interface PaginationQuery {
  page?: number;
  perPage?: number;
  paginationMetadataStyle?: "header" | "body";
}

declare interface PaginationMetadata {
  "x-next-page": number;
  "x-page": number;
  "x-pages-count": number;
  "x-per-page": number;
  "x-total-count": number;
}

declare interface PaginationData<T> {
  data: T[];
  metadata: PaginationMetadata;
}

interface PageQuery extends Query {
  page: number;
  perPage: number;
}
