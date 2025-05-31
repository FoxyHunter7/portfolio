export class APIRepository {
  async fetchServerJSON(
    url: string,
    method: string,
    body?: object | string,
    headerContentType = 'application/json'
  ): Promise<{success: boolean, errors?: string[], data?: object}> {
    const headers = {
      'Accept': 'application/json',
      'Content-Type': headerContentType
    };

    try {
      const response = await fetch(url, {
        method: method,
        headers: headers,
        ...(body && {body: JSON.stringify(body)})
      });

      if (!response.ok) {
        throw new Error(`Bad ${method} response: ${response.statusText}`);
      }

      return {
        success: true,
        data: await response.json()
      }
    } catch (err) {
      return {
        success: false,
        errors: [(err instanceof Error) ? err.message : '']
      }
    }
  }
}
