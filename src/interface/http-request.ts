import HttpMethod from '@/enum/http-method.enum';
import { HttpRequestOption } from '@/interface/schema/page.schema';

export default interface HttpRequest {
  origin: string;
  url: string;
  adapter: string;
  method: HttpMethod;
  option: HttpRequestOption;
  // 返回的型构 json
  responseShape: {
    success: string;
    failure: string;
  };
}
