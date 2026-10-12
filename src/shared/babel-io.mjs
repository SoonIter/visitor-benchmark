import { parse } from '@babel/parser';
import generate from '@babel/generator';
export const prepare = source => parse(source,{sourceType:'module'});
export const print = ast => generate(ast).code;
