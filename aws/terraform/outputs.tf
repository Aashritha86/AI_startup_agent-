output "vpc_id" {
  description = "VPC ID of the AI Startup Builder cluster"
  value       = aws_vpc.main.id
}

output "s3_bucket_name" {
  description = "S3 Bucket Name for startup exports and static assets"
  value       = aws_s3_bucket.assets.id
}

output "cloudfront_domain_name" {
  description = "CloudFront CDN edge domain name"
  value       = aws_cloudfront_distribution.cdn.domain_name
}

output "ecs_cluster_name" {
  description = "ECS Cluster Name"
  value       = aws_ecs_cluster.app_cluster.name
}
