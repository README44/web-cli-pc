/*
 * @Author: ZOUGUI zhj72793@gmail.com
 * @Date: 2023-11-08 15:25:11
 * @LastEditors: ZOUGUI zhj72793@gmail.com
 * @LastEditTime: 2023-12-28 16:41:09
 * @FilePath: \supply-chain-operation-admin\src\types\Enum.d.ts
 * @Description:
 *
 * Copyright (c) 2023 by AnGang, All Rights Reserved.
 */
import { TagProps } from 'element-plus';

/** 枚举 */
declare global {
  declare namespace Enum {
    interface Props {
      dictValue: String;
      dictNumber: String;
      // type?: TagProps['type'];
      [k: string]: any;
    }
    interface Options {
      dictName?: String;
      dictListResponse?: Array;
      [k: string]: any;
    }
  }
}
