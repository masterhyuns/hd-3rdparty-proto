export const fields = [
	{
		fieldName: "KorName",
		dataType: "text"
	},
	{
		fieldName: "Gender",
		dataType: "text"
	},
	{
		fieldName: "Age",
		dataType: "number"
	},
	{
		fieldName: "Phone",
		dataType: "text"
	},
	{
		fieldName: "ProductId",
		dataType: "text"
	},
	{
		fieldName: "KorCountry",
		dataType: "text"
	},
	{
		fieldName: "OrderDate",
		dataType: "datetime",
		datetimeFormat: "yyyy-MM-dd",
		amText: "오전",
		pmText: "오후"
	},
	{
		fieldName: "CardNumber",
		dataType: "text"
	},
	{
		fieldName: "Monetary",
		dataType: "text"
	},
	{
		fieldName: "StartDate",
		dataType: "datetime",
		datetimeFormat: "yyyy-MM-dd",
		amText: "오전",
		pmText: "오후"
	},
	{
		fieldName: "EndDate",
		dataType: "datetime",
		datetimeFormat: "yyyy-MM-dd",
		amText: "오전",
		pmText: "오후"
	},
	{
		fieldName: "ToMonth",
		dataType: "number"
	},
	{
		fieldName: "Month",
		dataType: "number"
	},
	{
		fieldName: "Year",
		dataType: "number"
	},
	{
		fieldName: "InterestRate",
		dataType: "number"
	},
	{
		fieldName: "SaveCost",
		dataType: "number"
	},
	{
		fieldName: "SaveMaturity",
		dataType: "number"
	},
	{
		fieldName: "CurrentSave",
		dataType: "number"
	}
];

export const columns = [
	{
		name: "KorCountry",
		fieldName: "KorCountry",
		width: "100",
		header: {
			text: "투자국가"
		}
	},
	{
		name: "Monetary",
		fieldName: "Monetary",
		width: "50",
		header: {
			text: "통화"
		}
	},
	{
		name: "KorName",
		fieldName: "KorName",
		width: "60",
		header: {
			text: "이름"
		},
		checkded: "true"
	},
	{
		name: "Gender",
		fieldName: "Gender",
		width: "40",
		header: {
			text: "성별"
		}
	},
	{
		name: "Age",
		fieldName: "Age",
		width: "40",
		header: {
			text: "나이"
		},
		styleName: "right-column"
	},
	{
		name: "StartDate",
		fieldName: "StartDate",
		width: "100",
		header: {
			text: "최초납입일"
		}
	},
	{
		name: "EndDate",
		fieldName: "EndDate",
		width: "100",
		header: {
			text: "종료일"
		}
	},
	{
		name: "ToMonth",
		fieldName: "ToMonth",
		width: "50",
		header: {
			text: "납입 횟수"
		},
		styleName: "right-column"
	},
	{
		name: "Month",
		fieldName: "Month",
		width: "50",
		header: {
			text: "남은 횟수"
		},
		styleName: "right-column"
	},
	{
		name: "InterestRate",
		fieldName: "InterestRate",
		width: "50",
		numberFormat: "0.00",
		header: {
			text: "이율"
		},
		groupFooter: {
			text: "소계 : "
		},
		footer: {
			text: "합계 : "
		},
		styleName: "right-column"
	},
	{
		name: "SaveCost",
		fieldName: "SaveCost",
		width: "80",
		numberFormat: "#,##0",
		header: {
			text: "납입금"
		},
		groupFooter: {
			numberFormat: "#,##0",
			expression: "sum"
		},
		footer: {
			numberFormat: "#,##0",
			expression: "sum"
		},
		styleName: "right-column"
	},
	{
		name: "SaveMaturity",
		fieldName: "SaveMaturity",
		width: "80",
		numberFormat: "#,##0",
		header: {
			text: "만기금액"
		},
		groupFooter: {
			numberFormat: "#,##0",
			expression: "sum"
		},
		footer: {
			numberFormat: "#,##0",
			expression: "sum"
		},
		styleName: "right-column"
	},
	{
		name: "CurrentSave",
		fieldName: "CurrentSave",
		width: "80",
		numberFormat: "#,##0",
		header: {
			text: "현재잔액"
		},
		groupFooter: {
			numberFormat: "#,##0",
			expression: "sum"
		},
		footer: {
			numberFormat: "#,##0",
			expression: "sum"
		},
		styleName: "right-column"
	}
];

export const rows = [
	{
		"KorName": "박영호",
		"Gender": "남",
		"Age": 71,
		"Phone": "(025)6563-2802",
		"ProductId": "198160731-00008",
		"KorCountry": "모잠비크",
		"OrderDate": "2021-01-15T15:00:00.000Z",
		"CardNumber": "5587-2139-9692-3644",
		"Monetary": "EUR",
		"StartDate": "2018-02-24T15:00:00.000Z",
		"EndDate": "2021-08-11T15:00:00.000Z",
		"ToMonth": 23,
		"Month": 41,
		"Year": 3,
		"InterestRate": 0.15,
		"SaveCost": 51000,
		"SaveMaturity": 14950650,
		"CurrentSave": 9304950
	},
	{
		"KorName": "조일형",
		"Gender": "남",
		"Age": 62,
		"Phone": "(093)8809-8696",
		"ProductId": "571215854-00001",
		"KorCountry": "캐나다",
		"OrderDate": "2019-07-28T15:00:00.000Z",
		"CardNumber": "5348-5093-3750-0623",
		"Monetary": "USD",
		"StartDate": "2019-10-20T15:00:00.000Z",
		"EndDate": "2022-12-10T15:00:00.000Z",
		"ToMonth": 3,
		"Month": 37,
		"Year": 3,
		"InterestRate": 0.38,
		"SaveCost": 14000,
		"SaveMaturity": 7801080,
		"CurrentSave": 1108520
	},
	{
		"KorName": "김덕중",
		"Gender": "여",
		"Age": 53,
		"Phone": "(064)5483-6874",
		"ProductId": "149115669-00009",
		"KorCountry": "캐나다",
		"OrderDate": "2020-03-07T15:00:00.000Z",
		"CardNumber": "5121-9931-3555-9853",
		"Monetary": "HKD",
		"StartDate": "2018-12-29T15:00:00.000Z",
		"EndDate": "2022-01-15T15:00:00.000Z",
		"ToMonth": 13,
		"Month": 36,
		"Year": 3,
		"InterestRate": 0.32,
		"SaveCost": 112000,
		"SaveMaturity": 50480640,
		"CurrentSave": 20805120
	},
	{
		"KorName": "국영석",
		"Gender": "남",
		"Age": 63,
		"Phone": "(044)7055-3032",
		"ProductId": "738027655-00005",
		"KorCountry": "부베 섬",
		"OrderDate": "2020-04-30T15:00:00.000Z",
		"CardNumber": "5571-3720-2975-7540",
		"Monetary": "AUD",
		"StartDate": "2019-08-14T15:00:00.000Z",
		"EndDate": "2021-12-22T15:00:00.000Z",
		"ToMonth": 5,
		"Month": 28,
		"Year": 2,
		"InterestRate": 0.2,
		"SaveCost": 84000,
		"SaveMaturity": 15523200,
		"CurrentSave": 4704000
	},
	{
		"KorName": "이강수",
		"Gender": "남",
		"Age": 59,
		"Phone": "(063)3620-4216",
		"ProductId": "867871717-00007",
		"KorCountry": "헝가리",
		"OrderDate": "2020-08-04T15:00:00.000Z",
		"CardNumber": "5244-3051-2681-3706",
		"Monetary": "VND",
		"StartDate": "2019-04-11T15:00:00.000Z",
		"EndDate": "2020-12-03T15:00:00.000Z",
		"ToMonth": 10,
		"Month": 19,
		"Year": 1,
		"InterestRate": 0.38,
		"SaveCost": 84000,
		"SaveMaturity": 13119120,
		"CurrentSave": 7660800
	},
]
