package thebestcsgroup.quikmafs;
import javax.swing.JButton;
import javax.swing.JComboBox;
import javax.swing.JFrame;
import javax.swing.JLabel;
import javax.swing.JPanel;
import javax.swing.JTextField;
public class ConversionsWindow extends JFrame {
	private static final long serialVersionUID=1L;
	private final JTextField valueField;
	private final JComboBox<Unit> convertFrom,convertTo;
	private final JLabel output;
	public ConversionsWindow() {
		super("Convert Units");
		setDefaultCloseOperation(DISPOSE_ON_CLOSE);
		setBounds(150,100,400,120);
		JPanel panel=new JPanel(null);
		JLabel label=new JLabel("Value to Convert");
		label.setBounds(2,2,100,15);
		panel.add(label);
		valueField=new JTextField();
		valueField.setBounds(2,18,100,20);
		panel.add(valueField);
		label=new JLabel("Convert From Unit:");
		label.setBounds(116,2,110,15);
		panel.add(label);
		convertFrom=new JComboBox<Unit>();
		convertFrom.setBounds(116,18,100,20);
		for(Unit u:Unit.values())
			convertFrom.addItem(u);
		panel.add(convertFrom);
		label=new JLabel("Convert To Unit:");
		label.setBounds(236,2,110,15);
		panel.add(label);
		convertTo=new JComboBox<Unit>();
		convertTo.setBounds(236,18,100,20);
		Unit.Type startingType=((Unit)convertFrom.getSelectedItem()).type;
		for(Unit u:Unit.values())
			if(u.type==startingType)
				convertTo.addItem(u);
		panel.add(convertTo);
		JButton calcButton=new JButton("Convert");
		calcButton.setBounds(2,40,99,20);
		panel.add(calcButton);
		output=new JLabel();
		output.setBounds(110,42,1000,15);
		panel.add(output);
		add(panel);
		convertFrom.addActionListener(e -> {
			convertTo.removeAllItems();
			Unit.Type type=((Unit)convertFrom.getSelectedItem()).type;
			for(Unit u:Unit.values())
				if(u.type==type)
					convertTo.addItem(u);
		});
		calcButton.addActionListener(e -> {
			try {
				double value=Double.parseDouble(valueField.getText());
				Unit convertFrom=(Unit)this.convertFrom.getSelectedItem(),convertTo=(Unit)this.convertTo.getSelectedItem();
				output.setText(value+" "+convertFrom+" = "+Console.sendToNodeServer(value,convertFrom,convertTo)+" "+convertTo);
			} catch(Exception ex) {
				output.setText("Invalid number format.");
			}
		});
	}
}
