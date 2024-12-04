import { AppInputProps } from "@/types";
import { TextField } from "@mui/material";

export default function AppInput({
	id,
	label,
	type = "text",
	error,
	register,
}: AppInputProps) {
	return (
		<TextField
			{...register}
			id={id}
			label={label}
			type={type}
			fullWidth
			margin='normal'
			error={!!error}
			helperText={error?.message}
			variant='outlined'
			InputLabelProps={{ shrink: true }}
		/>
	);
}
