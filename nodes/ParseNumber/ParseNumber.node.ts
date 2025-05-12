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

		const parseNumber = this.getNodeParameter('parseNumber', 0) as string;
		// if it contains more than 12 numbers return 'Número no válido'
		if (parseNumber.replace(/\D/g, '').length > 12) {
			return this.prepareOutputData({
				json: { parsedNumber: 'not valid number' },
			});
		}
		const phone = parsePhoneNumberFromString(parseNumber, 'MX');

		if (!phone || !phone.isValid()) {
			return this.prepareOutputData({
				json: { parsedNumber: 'not valid number' },
			});
		}

		const parsedNumber = phone.formatInternational();

		if (!parsedNumber) {
			return this.prepareOutputData({
				json: { parsedNumber: 'something went wrong' },
			});
		}

		return this.prepareOutputData({ json: { parsedNumber } });
	}
}
