import {
  PlusIcon, TrashIcon,
} from '@heroicons/react/16/solid'
import { useTranslations } from 'next-intl'
import { Input } from 'components/ui/input'
import { Button } from 'components/ui/button'

const RedirectUriEditor = ({
  redirectUris,
  onChange,
  disabled,
}: {
  redirectUris: string[];
  onChange: (uris: string[]) => void;
  disabled?: boolean;
}) => {
  const t = useTranslations()

  const handleRemoveUri = (targetIndex: number) => {
    const newUris = redirectUris.filter((
      uri, index,
    ) => {
      return targetIndex !== index
    })
    onChange(newUris)
  }

  const handleUpdateUri = (
    targetIndex: number, value: string,
  ) => {
    const newUris = redirectUris.map((
      uri, index,
    ) => {
      return targetIndex === index ? value : uri
    })
    onChange(newUris)
  }

  const handleAddMoreUri = () => {
    onChange([...redirectUris, ''])
  }

  return (
    <>
      <section className='flex flex-col gap-4'>
        {
          redirectUris.map((
            uri, index,
          ) => (
            <section
              key={index}
              className='flex flex-col'
            >
              <section className='flex items-center gap-2 w-full'>
                <Input
                  data-testid='redirectUriInput'
                  onChange={(e) => handleUpdateUri(
                    index,
                    e.target.value,
                  )}
                  value={uri}
                  className='w-full'
                  disabled={disabled}
                />
                {!disabled && (
                  <Button
                    variant='outline'
                    onClick={() => handleRemoveUri(index)}
                    size='sm'
                    data-testid='redirectUriRemoveButton'
                  >
                    <TrashIcon className='w-4 h-4' />
                  </Button>
                )}
              </section>
              <p className='mt-2'>{t('apps.urlFormat')}</p>
            </section>
          ))
        }
      </section>
      {!disabled && (
        <Button
          onClick={handleAddMoreUri}
          className='mt-4'
          size='sm'
          data-testid='redirectUriAddButton'
        >
          <PlusIcon className='w-4 h-4' />
        </Button>
      )}
    </>
  )
}

export default RedirectUriEditor
