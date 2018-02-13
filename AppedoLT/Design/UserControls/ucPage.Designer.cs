namespace AppedoLT
{
    partial class ucPage
    {
        /// <summary> 
        /// Required designer variable.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary> 
        /// Clean up any resources being used.
        /// </summary>
        /// <param name="disposing">true if managed resources should be disposed; otherwise, false.</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region Component Designer generated code

        /// <summary> 
        /// Required method for Designer support - do not modify 
        /// the contents of this method with the code editor.
        /// </summary>
        private void InitializeComponent()
        {
            this.lblPage = new Telerik.WinControls.UI.RadLabel();
            this.txtPageDelay = new Telerik.WinControls.UI.RadTextBox();
            this.lblDelay = new Telerik.WinControls.UI.RadLabel();
            this.lblPagename = new Telerik.WinControls.UI.RadLabel();
            this.radLabel1 = new Telerik.WinControls.UI.RadLabel();
            this.control1 = new System.Windows.Forms.Control();
            this.ThinkTimeLabel = new System.Windows.Forms.Label();
            ((System.ComponentModel.ISupportInitialize)(this.lblPage)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.txtPageDelay)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.lblDelay)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.lblPagename)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.radLabel1)).BeginInit();
            this.SuspendLayout();
            // 
            // lblPage
            // 
//            this.lblPage.BackColor = System.Drawing.SystemColors.ControlLightLight;
            this.lblPage.Location = new System.Drawing.Point(100, 27);
            this.lblPage.Name = "lblPage";
            this.lblPage.Size = new System.Drawing.Size(48, 17);
            this.lblPage.TabIndex = 19;
            this.lblPage.Text = "Method";
            // 
            // txtPageDelay
            // 
 //           this.txtPageDelay.BackColor = System.Drawing.SystemColors.ControlLightLight;
            this.txtPageDelay.Font = new System.Drawing.Font("Microsoft Sans Serif", 8.25F, System.Drawing.FontStyle.Bold);
            this.txtPageDelay.Location = new System.Drawing.Point(100, 50);
            this.txtPageDelay.Name = "txtPageDelay";
            // 
            // 
            // 
            this.txtPageDelay.RootElement.ControlBounds = new System.Drawing.Rectangle(100, 50, 100, 20);
            this.txtPageDelay.RootElement.StretchVertically = true;
            this.txtPageDelay.Size = new System.Drawing.Size(175, 18);
            this.txtPageDelay.TabIndex = 18;
            this.txtPageDelay.TabStop = false;
            this.txtPageDelay.TextAlign = System.Windows.Forms.HorizontalAlignment.Right;
            this.txtPageDelay.ThemeName = "Office2010";
            this.txtPageDelay.KeyPress += new System.Windows.Forms.KeyPressEventHandler(this.txtDelay_KeyPress);
            this.txtPageDelay.Validated += new System.EventHandler(this.txt_Validated);
            // 
            // lblDelay
            // 
//            this.lblDelay.BackColor = System.Drawing.SystemColors.ControlLightLight;
            this.lblDelay.Font = new System.Drawing.Font("Verdana", 8.25F, System.Drawing.FontStyle.Bold);
            this.lblDelay.Location = new System.Drawing.Point(3, 52);
            this.lblDelay.Name = "lblDelay";
            this.lblDelay.Size = new System.Drawing.Size(50, 17);
            this.lblDelay.TabIndex = 17;
            this.lblDelay.Text = "Delay :";
            // 
            // lblPagename
            // 
//            this.lblPagename.BackColor = System.Drawing.SystemColors.ControlLightLight;
            this.lblPagename.EnableTheming = false;
            this.lblPagename.Font = new System.Drawing.Font("Verdana", 8.25F, System.Drawing.FontStyle.Bold);
            this.lblPagename.Location = new System.Drawing.Point(3, 26);
            this.lblPagename.Name = "lblPagename";
            this.lblPagename.Size = new System.Drawing.Size(86, 17);
            this.lblPagename.TabIndex = 16;
            this.lblPagename.Text = "Page Name :";
            this.lblPagename.Click += new System.EventHandler(this.lblPagename_Click);
            // 
            // radLabel1
            // 
//            this.radLabel1.BackColor = System.Drawing.SystemColors.ControlLightLight;
            this.radLabel1.Font = new System.Drawing.Font("Verdana", 8.25F, System.Drawing.FontStyle.Bold);
            this.radLabel1.Location = new System.Drawing.Point(277, 51);
            this.radLabel1.Name = "radLabel1";
            this.radLabel1.Size = new System.Drawing.Size(25, 17);
            this.radLabel1.TabIndex = 20;
            this.radLabel1.Text = "ms";
            // 
            // control1
            // 
            this.control1.Location = new System.Drawing.Point(372, 58);
            this.control1.Name = "control1";
            this.control1.Size = new System.Drawing.Size(75, 23);
            this.control1.TabIndex = 21;
            this.control1.Text = "control1";
            // 
            // ThinkTimeLabel
            // 
            this.ThinkTimeLabel.Location = new System.Drawing.Point(3, 79);
            this.ThinkTimeLabel.Name = "ThinkTimeLabel";
            this.ThinkTimeLabel.Size = new System.Drawing.Size(502, 56);
            this.ThinkTimeLabel.TabIndex = 22;
            this.ThinkTimeLabel.Text = "Delay is prametrizable. Accepts value with $$<parametername>$$ and parameter must" +
    " be available as part of variable manager. If value is  invalid, think time of 1" +
    "00ms will be used.";
            this.ThinkTimeLabel.UseCompatibleTextRendering = true;
            // 
            // ucPage
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(7F, 13F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
//            this.BackColor = System.Drawing.SystemColors.Control;
            this.Controls.Add(this.ThinkTimeLabel);
            this.Controls.Add(this.control1);
            this.Controls.Add(this.radLabel1);
            this.Controls.Add(this.lblPage);
            this.Controls.Add(this.txtPageDelay);
            this.Controls.Add(this.lblDelay);
            this.Controls.Add(this.lblPagename);
            this.Font = new System.Drawing.Font("Verdana", 8.25F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.Name = "ucPage";
            this.Size = new System.Drawing.Size(508, 137);
            this.Load += new System.EventHandler(this.ucPage_Load);
            ((System.ComponentModel.ISupportInitialize)(this.lblPage)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.txtPageDelay)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.lblDelay)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.lblPagename)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.radLabel1)).EndInit();
            this.ResumeLayout(false);
            this.PerformLayout();

        }

        #endregion

        private Telerik.WinControls.UI.RadLabel lblPage;
        private Telerik.WinControls.UI.RadTextBox txtPageDelay;
        private Telerik.WinControls.UI.RadLabel lblDelay;
        private Telerik.WinControls.UI.RadLabel lblPagename;
        private Telerik.WinControls.UI.RadLabel radLabel1;
        private System.Windows.Forms.Control control1;
        private System.Windows.Forms.Label ThinkTimeLabel;
    }
}
