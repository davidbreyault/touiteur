export class CustomErrors {
  static deduceMessageWithStatusCode(code: number): string {
    if (code === 401) {
      return "Unauthorized, please log in.";
    }
    if (code === 403) {
      return "Forbidden, you don't have permission to access on this server.";
    }
    if (code === 404) {
      return "Ressource not found.";
    }
    return "Oooops ! ";
  }
}