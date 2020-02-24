exports.getPasswordResetURL = (user, token) =>
    `http://localhost:3000/password/reset/${user.id}/${token}`;

exports.resetPasswordTemplate = (user, url) => {
    const from = process.env.EMAIL_LOGIN;
    const to = user.email;
    const subject = "Rinascimento Password Reset";
    const html = `
      <p>Hey ${user.firstName || user.email},</p>
      <p>We heard that you lost your Rinascimento password. Sorry about that!</p>
      <p>But don’t worry! You can use the following link to reset your password:</p>
      <a href=${url}>${url}</a>
      <p>If you don’t use this link within 1 hour, it will expire.</p>
      <p>Arriverderci! </p>
      <p>–The Rinascimento Team</p>
    `;

    return { from, to, subject, html }
};