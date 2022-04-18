package thebestcsgroup.quikmafs;
import javax.swing.JButton;
import javax.swing.JComboBox;
import javax.swing.JFrame;
import javax.swing.JLabel;
import javax.swing.JPanel;
import javax.swing.JTextField;
public class ProbabilityWindow extends JFrame {
	private static final long serialVersionUID=1L;
	private final JTextField v1Field,v2Field;
	private final JComboBox<Character> operation;
	private final JLabel output;
	public ProbabilityWindow() {
		super("Calculate Probabilities");
		setDefaultCloseOperation(DISPOSE_ON_CLOSE);
		setBounds(150,100,350,100);
		JPanel panel=new JPanel(null);
		v1Field=new JTextField();
		v1Field.setBounds(2,2,80,20);
		panel.add(v1Field);
		v2Field=new JTextField();
		v2Field.setBounds(132,2,80,20);
		panel.add(v2Field);
		operation=new JComboBox<Character>();
		operation.setBounds(87,2,40,20);
		operation.addItem('P');
		operation.addItem('C');
		operation.addItem('∪');
		operation.addItem('∩');
		panel.add(operation);
		JButton calcButton=new JButton("Calculate");
		calcButton.setBounds(207,2,100,20);
		panel.add(calcButton);
		output=new JLabel();
		output.setBounds(22,32,1000,15);
		panel.add(output);
		add(panel);
		calcButton.addActionListener(e -> {
			try {
				double v1=Double.parseDouble(v1Field.getText()),v2=Double.parseDouble(v2Field.getText());
				char op=(char)operation.getSelectedItem();
				String v1Text,v2Text;
				if(op=='P'||op=='C') {
					v1Text=""+(int)v1;
					v2Text=""+(int)v2;
				} else {
					v1Text=""+v1;
					v2Text=""+v2;
				}
				output.setText(v1Text+" "+op+" "+v2Text+" = "+Console.sendToNodeServer(v1,v2,op));
			} catch(Exception ex) {
				output.setText("Invalid number format.");
			}
		});
	}
}
