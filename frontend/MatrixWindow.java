package thebestcsgroup.quikmafs;
import javax.swing.JButton;
import javax.swing.JFrame;
import javax.swing.JLabel;
import javax.swing.JPanel;
import javax.swing.JSpinner;
import javax.swing.JTextField;
import javax.swing.SpinnerNumberModel;
import javax.swing.event.ChangeListener;
import java.awt.*;

public class MatrixWindow extends JFrame {
	private static final long serialVersionUID=1L;
	private final JPanel panel;
	private final JSpinner rows,cols;
	private final JButton calcButton;
	private final JLabel rref;
	private JTextField[][] entries;
	public MatrixWindow() {
		super("RREF Calculator");
		setDefaultCloseOperation(EXIT_ON_CLOSE);
		setLocation(150,100);
		panel=new JPanel(null);
		add(panel);
		JLabel label=new JLabel("Rows");
		label.setBounds(12,5,35,15);
		panel.add(label);
		rows=new JSpinner(new SpinnerNumberModel(3,1,8,1));
		rows.setBounds(10,20,35,20);
		panel.add(rows);
		label=new JLabel("Columns");
		label.setBounds(50,5,50,15);
		panel.add(label);
		cols=new JSpinner(new SpinnerNumberModel(3,1,8,1));
		cols.setBounds(56,20,35,20);
		panel.add(cols);
		calcButton=new JButton("Calculate");
		calcButton.setBounds(110,12,90,20);
		panel.add(calcButton);
		rref=new JLabel();
		panel.add(rref);
		entries=null;
		updateSize(3,3);
		ChangeListener sizeUpdate=e -> updateSize((int)rows.getValue(),(int)cols.getValue());
		rows.addChangeListener(sizeUpdate);
		cols.addChangeListener(sizeUpdate);
		calcButton.addActionListener(e -> {
			Matrix mat=getAsMatrix();
			if(mat==null) {
				rref.setBounds(10,50+25*entries.length,200,15);
				rref.setText("Invalid matrix format.");
				return;
			}
			try {
				updateRREF(new Matrix(Console.sendToNodeServer(mat)));
			} catch(Exception ex) {
				ex.printStackTrace();
			}
		});
	}
	private Matrix getAsMatrix() {
		Matrix mat=new Matrix(entries.length,entries[0].length);
		try {
			for(int i=0;i<entries.length;i++)
				for(int j=0;j<entries[i].length;j++)
					mat.set(i,j,Double.parseDouble(entries[i][j].getText()));
		} catch(NumberFormatException e) {
			return null;
		}
		return mat;
	}
	private void updateSize(int rows,int cols) {

		Dimension currentSize = getSize();
		int currentWidth = currentSize.width;
		int currentHeight = currentSize.height;
		int minWidth = Math.max(30+55*cols,250);
		int minHeight = Math.max(30+35*rows,250);
		int updatedWidth = currentWidth;
		int updatedHeight = currentHeight;

		if(currentWidth < minWidth)
		{
			updatedWidth = minWidth;
		}
		if(currentHeight < minHeight)
		{
			updatedHeight = minHeight;
		}

		setSize(updatedWidth,updatedHeight);
		setSize(getWidth()+1,getHeight());
		setSize(getWidth()-1,getHeight());
		rref.setText(null);
		if(entries!=null)
			operateOnEntries(panel::remove);
		entries=new JTextField[rows][cols];
		JTextField entry;
		for(int i=0;i<rows;i++)
			for(int j=0;j<cols;j++) {
				entry=new JTextField("0");
				entry.setBounds(10+55*j,50+25*i,50,20);
				panel.add(entry);
				entries[i][j]=entry;
			}
	}
	private void updateRREF(Matrix mat) {
		rref.setBounds(10,50+25*entries.length,30*mat.cols,20+20*mat.rows);
		String label="<html>RREF<br/>";
		for(int i=0;i<mat.rows;i++) {
			label+="[ ";
			for(int j=0;j<mat.cols-1;j++)
				label+=mat.get(i,j)+" | ";
			label+=mat.get(i,mat.cols-1)+" ]<br/>";
		}
		label+="</html>";
		rref.setText(label);
	}
	private void operateOnEntries(EntryOp op) {
		for(JTextField[] row:entries)
			for(JTextField e:row)
				op.operate(e);
	}
	private interface EntryOp {
		void operate(JTextField e);
	}
}
