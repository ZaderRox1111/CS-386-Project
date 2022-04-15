package thebestcsgroup.quikmafs;

import java.awt.event.*;
import javax.swing.*;

public class HomePage implements ActionListener
{
 
	JFrame frame = new JFrame();
	JButton matrixButton = new JButton("Matrix");
	JButton statsButton = new JButton("Statistic");
	JButton conversionButton = new JButton("Conversions");
	JButton probabilityButton = new JButton("probability");
	 
	HomePage()
	{
		//matrix button setup
		matrixButton.setBounds(20,150,250,75);
		matrixButton.setFocusable(false);
		matrixButton.addActionListener(this);
		  
		//stats button setup
		statsButton.setBounds(20,225,250,75);
		statsButton.setFocusable(false);
		statsButton.addActionListener(this);
		  
		//conversion button setup
		conversionButton.setBounds(270,150,250,75);
		conversionButton.setFocusable(false);
		conversionButton.addActionListener(this);
		  
		//Probability button setup
		probabilityButton.setBounds(270,225,250,75);
		probabilityButton.setFocusable(false);
		probabilityButton.addActionListener(this);
		  
		frame.add(matrixButton);
		frame.add(statsButton);
		frame.add(conversionButton);
		frame.add(probabilityButton);
		  
		frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
		frame.setSize(550,375);
		frame.setLayout(null);
		frame.setVisible(true);
  }

	@Override
	public void actionPerformed(ActionEvent action) 
 	{
		if(action.getSource()==matrixButton) 
		{
			frame.dispose();
			new MatrixWindow().setVisible(true);
		}
		  
		if(action.getSource()==statsButton) 
		{
			frame.dispose();
			//StatsWindow statsCalc = new StatsWindow();
		}
		  
		if(action.getSource()==conversionButton) 
		{
			frame.dispose();
			//ConversionsWindow convertCalc = new ConversionsWindow();
		}
		  
		if(action.getSource()==probabilityButton) 
		{
			frame.dispose();
			//ProbabilityWindow probabiltyCalc = new ProbabiltyWindow();
		}
	}
}
