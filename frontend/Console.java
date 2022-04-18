package thebestcsgroup.quikmafs;
import java.io.File;
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
	static File jarLocation;
	static {
		try {
			jarLocation=new File(Console.class.getProtectionDomain().getCodeSource().getLocation().toURI());
		} catch(Exception e) {
			jarLocation=null;
			e.printStackTrace();
		}
	}
	public static void main(String[] args) {
		try {
			new HomePage().setVisible(true);
		} catch(Exception e) {
			e.printStackTrace();
		}
	}
	public static String sendToNodeServer(String path,List<NameValuePair> nvps) throws Exception {
        DefaultHttpClient httpclient=new DefaultHttpClient();
        HttpPost httpost=new HttpPost(path);
        httpost.setEntity(new UrlEncodedFormEntity(nvps,HTTP.UTF_8));
        HttpResponse response=httpclient.execute(httpost);
        httpclient.getConnectionManager().shutdown();
        httpclient.close();
        InputStream content=response.getEntity().getContent();
        String result="";
        int next;
        while(true) {
        	next=content.read();
        	if(next==-1)
        		break;
        	result+=(char)next;
        }
        return result;
	}
	public static String sendToNodeServer(Matrix mat) throws Exception {
		if(mat==null)
			return null;
        List<NameValuePair> nvps=new ArrayList<NameValuePair>();
        nvps.add(new BasicNameValuePair("rows",""+mat.rows));
        nvps.add(new BasicNameValuePair("cols",""+mat.cols));
        nvps.add(new BasicNameValuePair("entries",mat.toString()));
        return sendToNodeServer("http://104.168.247.236/server/matrix/calculate",nvps);
	}
	public static String sendToNodeServer(double value,Unit convertFrom,Unit convertTo) throws Exception {
        List<NameValuePair> nvps=new ArrayList<NameValuePair>();
        nvps.add(new BasicNameValuePair("value",""+value));
        nvps.add(new BasicNameValuePair("category",convertFrom.type.toString()));
        nvps.add(new BasicNameValuePair("convertFrom",convertFrom.toString()));
        nvps.add(new BasicNameValuePair("convertTo",convertTo.toString()));
        return sendToNodeServer("http://104.168.247.236/server/conversion",nvps);
	}
	public static String sendToNodeServer(double v1,double v2,char op) throws Exception {
		List<NameValuePair> nvps=new ArrayList<NameValuePair>();
		switch(op) {
			case 'P':
			nvps.add(new BasicNameValuePair("n",""+(int)v1));
			nvps.add(new BasicNameValuePair("r",""+(int)v2));
				return sendToNodeServer("http://104.168.247.236/server/probability/pnr",nvps);
			case 'C':
			nvps.add(new BasicNameValuePair("n",""+(int)v1));
			nvps.add(new BasicNameValuePair("r",""+(int)v2));
				return sendToNodeServer("http://104.168.247.236/server/probability/cnr",nvps);
			case '∪':
			nvps.add(new BasicNameValuePair("probA",""+v1));
			nvps.add(new BasicNameValuePair("probB",""+v2));
				return sendToNodeServer("http://104.168.247.236/server/probability/union",nvps);
			case '∩':
			nvps.add(new BasicNameValuePair("probA",""+v1));
			nvps.add(new BasicNameValuePair("probB",""+v2));
				return sendToNodeServer("http://104.168.247.236/server/probability/intersect",nvps);
			default:
				return null;
		}
	}
}
