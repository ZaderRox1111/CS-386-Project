package thebestcsgroup.quikmafs;
import javax.swing.JButton;
import javax.swing.JFrame;
import javax.swing.JLabel;
import javax.swing.JPanel;
import javax.swing.JSpinner;
import javax.swing.JTextField;
import javax.swing.SpinnerNumberModel;
import javax.swing.event.ChangeListener;
public class MatrixWindow extends JFrame {
	private static final long serialVersionUID=1L;
	private final JPanel panel;
	private final JSpinner rows,cols;
	private final JButton calcButton;
	private final JLabel ref,rref;
	private JTextField[][] entries;
	public MatrixWindow() {
		super("RREF Calculator");
		setDefaultCloseOperation(EXIT_ON_CLOSE);
		setLocation(100,100);
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
		ref=new JLabel();
		rref=new JLabel();
		entries=null;
		updateSize(3,3);
		ChangeListener sizeUpdate=e -> updateSize((int)rows.getValue(),(int)cols.getValue());
		rows.addChangeListener(sizeUpdate);
		cols.addChangeListener(sizeUpdate);
	}
	private void updateSize(int rows,int cols) {
		setSize(30+55*cols,100+30*rows);
		if(entries!=null)
			operateOnEntries(panel::remove);
		entries=new JTextField[rows][cols];
		JTextField entry;
		for(int i=0;i<rows;i++) {
			for(int j=0;j<cols;j++) {
				entry=new JTextField("0");
				entry.setBounds(10+55*j,50+25*i,50,20);
				panel.add(entry);
				entries[i][j]=entry;
			}
		}
	}
	private void updateREF() {
		//will involve the methods that communicate with the server,
		//after those have been finished
	}
	private void updateRREF() {
		//requires server (again)
	}
	private void operateOnEntries(EntryOp op) {
		for(JTextField[] row:entries)
			for(JTextField e:row)
				op.operate(e);
	}
	private static interface EntryOp {
		void operate(JTextField e);
	}
}
