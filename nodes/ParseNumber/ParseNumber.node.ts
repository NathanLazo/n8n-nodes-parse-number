// @ts-nocheck
import { INodeType, INodeTypeDescription } from 'n8n-workflow';
import { parsePhoneNumberFromString } from 'libphonenumber-js';

export class ParseNumber implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'ParseNumber',
		name: 'parseNumber',
		group: ['transform'],
		version: 1,
		description: 'A custom node that parses phone number',
		defaults: {
			name: 'Parse Phone Number',
		},
		inputs: ['main'],
		outputs: ['main'],
		properties: [
			{
				displayName: 'Parse Number',
				name: 'parseNumber',
				type: 'string',
				default: '',
				placeholder: 'Enter any number',
				description: 'Any number to parsed number',
			},
		],
	};

	async execute(this: any) {
		// const items = this.getInputData();
		const returnData = [];

		const parseNumber = this.getNodeParameter('parseNumber', 0) as string;
		const phone = parsePhoneNumberFromString(parseNumber, 'MX');

		if (!phone || !phone.isValid()) {
			return 'Número no válido';
		}

		const parsedNumber = phone.formatInternational();

		returnData.push({ json: { parsedNumber } });

		return this.prepareOutputData(returnData);
	}
}
