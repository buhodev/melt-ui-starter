export const handle = async ({ event, resolve }) => {
	let location;

	try {
		location = event.getClientAddress();
	} catch (e) {
		console.log('catch error: ', e);
		location = event.request.headers.get('x-forwarded-for') || event.request.headers.get('cf-connecting-ip') || '';
	}

	const response = await resolve(event);

	console.log({ location });
	console.log(
		'x-forwarded-for: ',
		event.request.headers.get('x-forwarded-for'),
		'cf-connecting-ip: ',
		event.request.headers.get('cf-connecting-ip')
	);

	return response;
};
