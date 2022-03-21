package thebestcsgroup.quikmafs;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;
import org.apache.http.HttpResponse;
import org.apache.http.NameValuePair;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.impl.client.DefaultHttpClient;
import org.apache.http.message.BasicNameValuePair;
import org.apache.http.protocol.HTTP;
@SuppressWarnings("deprecation")
public class Console {
	public static void main(String[] args) {
		new MatrixWindow().setVisible(true);
	}
	public static String sendToNodeServer(Matrix mat) throws Exception {
		if(mat==null)
			return null;
        DefaultHttpClient httpclient = new DefaultHttpClient();
        HttpPost httpost = new HttpPost("http://104.168.247.236/server/matrix/calculate");List <NameValuePair> nvps = new ArrayList <NameValuePair>();
        nvps.add(new BasicNameValuePair("rows",""+mat.rows));
        nvps.add(new BasicNameValuePair("cols",""+mat.cols));
        nvps.add(new BasicNameValuePair("entries",""+mat.toString()));
        httpost.setEntity(new UrlEncodedFormEntity(nvps, HTTP.UTF_8));
        HttpResponse response = httpclient.execute(httpost);
        httpclient.getConnectionManager().shutdown();
        httpclient.close();
        InputStream content=response.getEntity().getContent();
        String result="";
        char next;
        do {
        	next=(char)content.read();
        	if(next!=(char)-1)
        		result+=next;
        } while(next!=(char)-1);
        return result;
	}
}
