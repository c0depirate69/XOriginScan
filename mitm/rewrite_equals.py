from mitmproxy import http
import re

def response(flow: http.HTTPFlow) -> None:
    if 'text/javascript' in flow.response.headers.get('content-type', ''):
        flow.response.text = re.sub(r'===', '==', flow.response.text)
