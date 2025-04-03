export const sendWelcomeEmail = async ({
  firstName,
  lastName,
  email,
}: { firstName: string; lastName: string; email: string }) => {
  // Simulate sending an email
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(`Simulating sending welcome email to ${email}`)
      resolve({ success: true })
    }, 500)
  })
    .then((result: any) => {
      return result
    })
    .catch((error: any) => {
      console.error("Error sending welcome email:", error)
      return { success: false, error: "Failed to send welcome email" }
    })
}

