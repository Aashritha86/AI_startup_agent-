variable "aws_region" {
  type        = string
  default     = "us-east-1"
  description = "AWS Deployment Target Region"
}

variable "environment" {
  type        = string
  default     = "production"
  description = "Deployment Environment (staging/production)"
}

variable "ecr_repository_url" {
  type        = string
  default     = "123456789012.dkr.ecr.us-east-1.amazonaws.com/ai-startup-builder"
  description = "ECR Repository URL for Next.js Container Image"
}
