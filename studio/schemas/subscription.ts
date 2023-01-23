export default {
	name: "subscription",
	title: "Subscription",
	type: "document",
	preview: {
		select: {
			title: "email",
			subtitle: "subscriptionName",
		},
	},
	fields: [
		{
			title: "Square Customer ID",
			name: "squareCustomerId",
			type: "string",
		},
		{
			title: "Square Subscription ID",
			name: "squareSubscriptionId",
			type: "string",
		},
		{
			title: "Square Plan ID",
			name: "squarePlanId",
			type: "string",
		},
		{
			title: "Status",
			name: "status",
			type: "string",
		},
		{
			title: "Subscription Name",
			name: "subscriptionName",
			type: "string",
			options: {
				list: ["Iridium", "Rhodium", "Cesium"],
			},
		},
		{
			title: "Coupon Code",
			name: "couponCode",
			type: "slug",
			isUnique: "true",
		},
		{
			title: "Posting Count",
			name: "postingCount",
			type: "number",
		},
		{
			title: "Email Address",
			name: "email",
			type: "string",
			validation: (Rule) =>
				Rule.regex(
					/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
					{
						name: "email", // Error message is "Does not match email-pattern"
						invert: false, // Boolean to allow any value that does NOT match pattern
					}
				).required(),
		},
		{
			name: "company",
			title: "Company",
			type: "reference",
			to: [
				{
					type: "company",
				},
			],
		},
	],
};
