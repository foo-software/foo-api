import querystring from 'querystring';

export const getQueryString = (parameters: any = {}) =>
  !Object.keys(parameters).length
    ? ''
    : `?${querystring.encode({ ...parameters })}`;

export const getMissingRequiredFieldErrors = ({
  fields,
  data,
}: {
  fields: Array<any>;
  data: any;
}) => {
  const missingFields = fields.reduce(
    (accumulator, current) => [
      ...accumulator,
      ...(data[current] ? [] : [`"${current}"`]),
    ],
    []
  );

  if (!missingFields.length) {
    return null;
  }

  return `missing the following required fields: ${missingFields.join(', ')}`;
};
