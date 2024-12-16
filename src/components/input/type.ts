interface BaseInputProps<T=any>{
	type:string;
	value:T;
	onChange:(value:T)=>void;
	data: any
}
interface TextInputProps extends BaseInputProps {
	type:'text';
}
interface NumberInputProps extends BaseInputProps {
	type:'number';
	min?: number;
	max?: number;
}

export type InputProps = TextInputProps | NumberInputProps