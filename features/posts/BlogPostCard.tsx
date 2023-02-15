import {
  Box,
  HStack,
  Heading,
  Image,
  SpaceProps,
  Stack,
  Tag,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';

import { AnimatedBottomBorder } from '@/components/AnimatedBottomBorder';
import { BlogPost } from '@/lib/types';
import { FunctionComponent } from 'react';
import Link from 'next/link';
import { format } from 'date-fns';
import { map } from 'lodash';

type BlogCardProps = BlogPost & {
  size?: 'large' | 'small';
  isReverse?: boolean;
};

type IBlogTags = {
  tags: Array<string>;
  marginTop?: SpaceProps['marginTop'];
};

const BlogTags: FunctionComponent<IBlogTags> = ({
  tags,
  marginTop = { base: 2, md: 4 },
}) => {
  return (
    <HStack spacing={2} marginTop={marginTop}>
      {map(tags, (tag: string) => {
        return (
          <Tag size={'md'} variant='solid' colorScheme='orange' key={tag}>
            {tag}
          </Tag>
        );
      })}
    </HStack>
  );
};

export const BlogPostCard: FunctionComponent<BlogCardProps> = ({
  title,
  excerpt,
  mainImage,
  publishedAt,
  slug,
  author,
  _createdAt,
  categories,
  size = 'large',
  isReverse = false,
}) => {
  const headingColor = useColorModeValue(
    'text.light.headings',
    'text.dark.headings',
  );

  console.log(categories);

  return (
    <Link href={`/tech-stories/${slug.current}`}>
      <Stack
        w={'full'}
        p={4}
        direction={{
          base: 'column',
          md: size === 'large' ? (isReverse ? 'row-reverse' : 'row') : 'column',
        }}
        justifyContent={'center'}
        spacing={4}>
        <Box maxH={80} overflow={'hidden'} borderRadius={'lg'}>
          {mainImage && (
            <Image
              src={mainImage.asset.url}
              alt={'Baraka Mulumia - Blog Post: ' + title}
              objectFit={'cover'}
            />
          )}
        </Box>

        <Stack maxW={'sm'} spacing={4}>
          <BlogTags tags={map(categories, category => category.title)} />
          <AnimatedBottomBorder>
            <Heading
              as='h3'
              p={1}
              fontSize={'2xl'}
              color={headingColor}
              textTransform={'capitalize'}>
              {title}
            </Heading>
          </AnimatedBottomBorder>
          <Text lineHeight={1.2} noOfLines={5}>
            {excerpt}
          </Text>

          <HStack spacing={1}>
            <Image
              src={author.image.asset.url}
              alt=''
              w={8}
              h={8}
              rounded={'full'}
            />
            <Stack direction={'column'} spacing={0}>
              <Text fontSize={'sm'}>{author.name} </Text>
              <Text fontSize={'xs'}>
                {format(new Date(publishedAt || _createdAt), 'MMMM dd, yyyy')}
              </Text>
            </Stack>
          </HStack>
        </Stack>
      </Stack>
    </Link>
  );
};