package thebestcsgroup.quikmafs;
import java.io.InputStream;
import org.apache.http.HttpResponse;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.DefaultHttpClient;
@SuppressWarnings("deprecation")
public class Console {
	public static void main(String[] args) {
		new MatrixWindow().setVisible(true);
	}
	public static String sendToNodeServer(Matrix mat) throws Exception {
        DefaultHttpClient httpclient = new DefaultHttpClient();
        HttpPost httpost = new HttpPost("http://104.168.247.236/server/matrix/calculate");
        httpost.setEntity(new StringEntity(mat.toString()));
        HttpResponse response = httpclient.execute(httpost);
        httpclient.getConnectionManager().shutdown();
        httpclient.close();
        InputStream content=response.getEntity().getContent();
        String result="";
        char next;
        do {
        	next=(char)content.read();
        	if(next!=-1)
        		result+=next;
        } while(next!=-1);
        System.out.println("Received string: "+result);
        return result;
	}
}
