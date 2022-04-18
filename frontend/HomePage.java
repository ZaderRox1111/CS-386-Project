package thebestcsgroup.quikmafs;
import java.io.File;
import javax.imageio.ImageIO;
import javax.swing.ImageIcon;
import javax.swing.JButton;
import javax.swing.JFrame;
import javax.swing.JLabel;
import javax.swing.JPanel;
public class HomePage extends JFrame {
	private static final long serialVersionUID=1L; //Used internally by Eclipse
	public HomePage() throws Exception {
		super("QuikMafs Calculator");
		setDefaultCloseOperation(EXIT_ON_CLOSE);
		setBounds(150,100,360,375);
		JPanel panel=new JPanel(null);
		
		//image logo setup
		JLabel imgLabel=new JLabel(new ImageIcon(ImageIO.read(new File(Console.jarLocation,"logo.png"))));
		imgLabel.setBounds(0,0,340,180);
		panel.add(imgLabel);
		
		//matrix button setup
		JButton matrixButton = new JButton("Matrix RREF");
		matrixButton.setBounds(46,170,250,50);
		matrixButton.setFocusable(false);
		matrixButton.addActionListener(e -> new MatrixWindow().setVisible(true));
		panel.add(matrixButton);
		  
		//conversion button setup
		JButton conversionButton = new JButton("Conversions");
		conversionButton.setBounds(46,220,250,50);
		conversionButton.setFocusable(false);
		conversionButton.addActionListener(e -> new ConversionsWindow().setVisible(true));
		panel.add(conversionButton);
		  
		//Probability button setup
		JButton probabilityButton = new JButton("Probability");
		probabilityButton.setBounds(46,270,250,50);
		probabilityButton.setFocusable(false);
		probabilityButton.addActionListener(e -> new ProbabilityWindow().setVisible(true));
		panel.add(probabilityButton);
		
		add(panel);
	}
}
