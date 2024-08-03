import * as Yup from 'yup';

// Define the Yup validation schema
const propertySchema = Yup.object().shape({
  address: Yup.string().required('Address is required'),
  cost: Yup.number().positive('Cost must be a positive number').required('Cost is required'),
  city: Yup.string().required('City is required'),
  yearBuilt: Yup.number().min(0, 'Year Built must be a positive number').required('Year Built is required'),
  area: Yup.number().positive('Area must be a positive number').required('Area is required'),
  bedrooms: Yup.number().min(1, 'Bedrooms must be at least 1').required('Bedrooms is required'),
  bathrooms: Yup.number().min(1, 'Bathrooms must be at least 1').required('Bathrooms is required'),
  floors: Yup.number().min(1, 'Floors must be at least 1').required('Floors is required'),
  amenities: Yup.array().of(Yup.string()),
  visitTimings: Yup.string()
    .matches(
      /^(\d{1,2}:\d{2}\s?[APM]{2}\s?-\s?\d{1,2}:\d{2}\s?[APM]{2})$/,
      'Visit timings must be in "8:00 AM - 5:30 PM" format'
    )
    .required('Visit Timings is required'),
  type: Yup.string().required('Type is required'),
});

export default propertySchema;