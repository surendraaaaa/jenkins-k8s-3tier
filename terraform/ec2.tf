resource "aws_key_pair" "deployer" {
  key_name   = "terra-automate-key"
  public_key = file("/home/n01521961/CICD-projects/jenkins-k8s-3tier/terraform/yes.pub")
}

resource "aws_default_vpc" "default" {

}

resource "aws_instance" "testinstance" {
  ami             = var.ami_id
  instance_type   = var.instance_type
  key_name        = aws_key_pair.deployer.key_name
  vpc_security_group_ids = ["sg-07bfaba0e63d7f652"]
  tags = {
    Name = "jenkins-k8s-3tier"
  }
  root_block_device {
    volume_size = 29  
    volume_type = "gp3"
  }
}
