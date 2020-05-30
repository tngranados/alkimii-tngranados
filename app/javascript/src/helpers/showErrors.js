export default function showErrors(e) {
  let errors = {};
  const messages = e.response.data.errors;

  if (messages) {
    for (const key in messages) {
      errors[key] = messages[key].join(", ");
    }
  }

  return errors;
}
