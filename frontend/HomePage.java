package thebestcsgroup.quikmafs;
import javax.swing.JButton;
import javax.swing.JFrame;
import javax.swing.JPanel;
public class HomePage extends JFrame {
	private static final long serialVersionUID=1L; //Used internally by Eclipse
	private JButton matrixButton = new JButton("Matrix");
	private JButton statsButton = new JButton("Statistic");
	private JButton conversionButton = new JButton("Conversions");
	private JButton probabilityButton = new JButton("probability");
	public HomePage() {
		setDefaultCloseOperation(EXIT_ON_CLOSE);
		setSize(550,375);
		//matrix button setup
		matrixButton.setBounds(20,150,250,75);
		matrixButton.setFocusable(false);
		matrixButton.addActionListener(e -> new MatrixWindow().setVisible(true));
		
		//stats button setup
		statsButton.setBounds(20,225,250,75);
		statsButton.setFocusable(false);
		//statsButton.addActionListener(e -> new StatisticsWindow().setVisible(true));
		  
		//conversion button setup
		conversionButton.setBounds(270,150,250,75);
		conversionButton.setFocusable(false);
		//conversionButton.addActionListener(e -> new ConversionsWindow().setVisible(true));
		  
		//Probability button setup
		probabilityButton.setBounds(270,225,250,75);
		probabilityButton.setFocusable(false);
		//probabilityButton.addActionListener(e -> new ProbabilityWindow().setVisible(true));
		
		JPanel panel=new JPanel(null);
		panel.add(matrixButton);
		panel.add(statsButton);
		panel.add(conversionButton);
		panel.add(probabilityButton);
		add(panel);
	}
}
