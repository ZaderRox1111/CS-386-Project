package thebestcsgroup.quikmafs;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
public class Matrix {
	public final double[] entries;
	public final int rows,cols;
	public Matrix(int rows,int cols) {
		entries=new double[rows*cols];
		this.rows=rows;
		this.cols=cols;
	}
	public Matrix(String json) {
		JsonObject obj=JsonParser.parseString(json).getAsJsonObject();
		rows=obj.get("rows").getAsInt();
		cols=obj.get("cols").getAsInt();
		this.entries=new double[rows*cols];
		JsonArray entries=obj.get("entries").getAsJsonArray();
		for(int i=0;i<entries.size();i++)
			this.entries[i]=entries.get(i).getAsDouble();
	}
	public double get(int r,int c) {
		return entries[r*cols+c];
	}
	public void set(int r,int c,double e) {
		entries[r*cols+c]=e;
	}
	@Override
	public String toString() {
		String str="{rows:"+rows+",cols:"+cols+",entries:[";
		for(int i=0;i<entries.length-1;i++)
			str+=entries[i]+",";
		str+=entries[entries.length-1]+"]}";
		return str;
	}
}
