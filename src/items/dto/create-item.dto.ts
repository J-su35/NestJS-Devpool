import { IsNotEmpty, IsNumber, IsOptional, IsString, ValidationArguments } from "class-validator";

const isNumberMesssage = (validationArguments: ValidationArguments): string => {
    return `${validationArguments.property}: ต้องเป็นตัวเลข`
  }

export class CreateItemDto {
    @IsString()
    @IsNotEmpty()
    title: string;
    
    //Original code
    // @IsNumber()
    // @IsNotEmpty()
    // amount: number;

    // @IsNumber()
    // @IsNotEmpty()
    // price: number;

    // Last day method 1
    // @IsNumber({}, { message: (v) => (`${v.property}: Should be number`)})
    // @IsNotEmpty()
    // amount: number;

    // @IsNumber({}, { message: (v) => (`${v.property}: Should be number`)})
    // @IsNotEmpty()
    // price: number;

    // Last day method 2
    @IsNumber({}, { message: isNumberMesssage })
    @IsNotEmpty()
    amount: number;

    @IsNumber({}, { message: isNumberMesssage })
    @IsNotEmpty()
    price: number;

    @IsOptional()
    contactMobileNo: string;
}
