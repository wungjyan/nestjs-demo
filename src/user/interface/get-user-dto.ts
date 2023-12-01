// 查询所有用户的条件
export interface getUserDto {
  page: number;
  limit?: number;
  username?: string;
  role?: number;
  gender?: number;
}
