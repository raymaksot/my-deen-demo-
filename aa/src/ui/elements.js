// UI Kit: Elements
// Базовые UI-компоненты: Button, Input, Switch, Checkbox, Card, Icon
import React from 'react';
import { Text, TouchableOpacity, TextInput, View, Switch } from 'react-native';
import palette from 'src/ui/colors';
import { typography } from './typography';

export const Button = ({ title, onPress, style, variant = 'primary', loading, disabled }) => (
	<TouchableOpacity
			style={{
				backgroundColor: disabled ? palette[variant] + '80' : palette[variant],
				borderRadius: 8,
				paddingVertical: 12,
				paddingHorizontal: 24,
				alignItems: 'center',
				opacity: disabled ? 0.6 : 1,
				...style,
			}}
			onPress={onPress}
			disabled={disabled}
		>
			{loading ? (
				<Text style={[typography.h5, { color: palette?.background || '#FFFFFF' }]}>...</Text>
			) : (
				<Text style={[typography.h5, { color: palette?.background || '#FFFFFF' }]}>{title}</Text>
			)}
		</TouchableOpacity>
	);

export const Input = ({ value, onChangeText, placeholder, style, disabled, ...props }) => (
	<TextInput
			value={value}
			onChangeText={onChangeText}
			placeholder={placeholder}
			editable={!disabled}
			style={[
				{
					backgroundColor: disabled ? palette.surface : palette.surface,
					borderColor: palette.secondary,
					borderWidth: 1,
					borderRadius: 8,
					padding: 12,
				},
				typography.paragraph,
				style,
			]}
			{...props}
		/>
	);

export const SwitchElement = ({ value, onValueChange, style }) => (
	<Switch
		value={value}
		onValueChange={onValueChange}
		trackColor={{ false: palette.secondary, true: palette.primary }}
		thumbColor={value ? palette.primary2 : palette.secondary2}
		style={style}
	/>
);

export const Checkbox = ({ checked, onChange, style, disabled }) => (
	<TouchableOpacity
			onPress={() => !disabled && onChange(!checked)}
			style={{
				width: 24,
				height: 24,
				borderRadius: 4,
				borderWidth: 2,
				borderColor: checked ? palette.primary : palette.secondary,
				backgroundColor: checked ? palette.primary : (palette?.background || '#FFFFFF'),
				alignItems: 'center',
				justifyContent: 'center',
				opacity: disabled ? 0.5 : 1,
				...style,
			}}
			disabled={disabled}
		>
			{checked && <View style={{ width: 12, height: 12, backgroundColor: palette?.background || '#FFFFFF', borderRadius: 2 }} />}
		</TouchableOpacity>
	);
